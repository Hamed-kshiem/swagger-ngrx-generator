#!/usr/bin/env python3
"""
NgRx Generator from Swagger/OpenAPI
Generates NgRx store files (actions, effects, reducers, selectors, services) from Swagger/OpenAPI specification
"""

import json
import yaml
import os
import argparse
from typing import Dict, List, Any, Optional
from pathlib import Path
import re


class NgRxGenerator:
    def __init__(self, swagger_file: str, output_dir: str = "./src/app/store"):
        self.swagger_file = swagger_file
        self.output_dir = Path(output_dir)
        self.swagger_data = self._load_swagger_file()
        self.base_url = self._extract_base_url()
        
    def _load_swagger_file(self) -> Dict[str, Any]:
        """Load and parse the Swagger/OpenAPI file"""
        with open(self.swagger_file, 'r') as file:
            if self.swagger_file.endswith('.json'):
                return json.load(file)
            else:
                return yaml.safe_load(file)
    
    def _extract_base_url(self) -> str:
        """Extract base URL from Swagger spec"""
        if 'servers' in self.swagger_data and self.swagger_data['servers']:
            return self.swagger_data['servers'][0]['url']
        elif 'host' in self.swagger_data:
            scheme = self.swagger_data.get('schemes', ['https'])[0]
            return f"{scheme}://{self.swagger_data['host']}{self.swagger_data.get('basePath', '')}"
        return "/api"
    
    def _to_camel_case(self, snake_str: str) -> str:
        """Convert snake_case to camelCase"""
        components = snake_str.split('_')
        return components[0] + ''.join(x.capitalize() for x in components[1:])
    
    def _to_pascal_case(self, snake_str: str) -> str:
        """Convert snake_case to PascalCase"""
        return ''.join(x.capitalize() for x in snake_str.split('_'))
    
    def _extract_path_parameters(self, path: str) -> List[str]:
        """Extract parameter names from path like /users/{id}"""
        return re.findall(r'\{([^}]+)\}', path)
    
    def _get_return_type(self, responses: Dict) -> str:
        """Extract return type from responses"""
        success_response = responses.get('200', responses.get('201', {}))
        if 'content' in success_response:
            content = success_response['content']
            if 'application/json' in content:
                schema = content['application/json'].get('schema', {})
                if '$ref' in schema:
                    return schema['$ref'].split('/')[-1]
                elif 'type' in schema:
                    if schema['type'] == 'array' and 'items' in schema:
                        if '$ref' in schema['items']:
                            return f"{schema['items']['$ref'].split('/')[-1]}[]"
                        return 'any[]'
                    return 'any'
        return 'any'
    
    def _extract_operations(self) -> List[Dict]:
        """Extract all operations from Swagger paths"""
        operations = []
        
        for path, path_item in self.swagger_data.get('paths', {}).items():
            for method, operation in path_item.items():
                if method.lower() in ['get', 'post', 'put', 'delete', 'patch']:
                    operation_id = operation.get('operationId', f"{method}_{path.replace('/', '_').replace('{', '').replace('}', '')}")
                    
                    operations.append({
                        'operationId': operation_id,
                        'method': method.upper(),
                        'path': path,
                        'summary': operation.get('summary', ''),
                        'parameters': self._extract_path_parameters(path),
                        'requestBody': 'requestBody' in operation,
                        'returnType': self._get_return_type(operation.get('responses', {})),
                        'tags': operation.get('tags', ['default'])
                    })
        
        return operations
    
    def generate_models(self):
        """Generate TypeScript interfaces from Swagger components/definitions"""
        components = self.swagger_data.get('components', {}).get('schemas', {})
        if not components:
            components = self.swagger_data.get('definitions', {})
        
        if not components:
            return
        
        models_dir = self.output_dir / "models"
        models_dir.mkdir(parents=True, exist_ok=True)
        
        # Generate barrel export
        index_exports = []
        
        for model_name, schema in components.items():
            model_content = self._generate_model_interface(model_name, schema)
            model_file = models_dir / f"{model_name.lower()}.model.ts"
            
            with open(model_file, 'w') as f:
                f.write(model_content)
            
            index_exports.append(f"export * from './{model_name.lower()}.model';")
        
        # Create index.ts for barrel exports
        with open(models_dir / "index.ts", 'w') as f:
            f.write('\n'.join(index_exports))
    
    def _generate_model_interface(self, model_name: str, schema: Dict) -> str:
        """Generate TypeScript interface from schema"""
        interface_lines = [f"export interface {model_name} {{"]
        
        properties = schema.get('properties', {})
        required = schema.get('required', [])
        
        for prop_name, prop_schema in properties.items():
            optional = '' if prop_name in required else '?'
            prop_type = self._get_typescript_type(prop_schema)
            interface_lines.append(f"  {prop_name}{optional}: {prop_type};")
        
        interface_lines.append("}")
        
        return '\n'.join(interface_lines)
    
    def _get_typescript_type(self, schema: Dict) -> str:
        """Convert OpenAPI schema type to TypeScript type"""
        if '$ref' in schema:
            return schema['$ref'].split('/')[-1]
        
        schema_type = schema.get('type', 'any')
        
        type_mapping = {
            'string': 'string',
            'integer': 'number',
            'number': 'number',
            'boolean': 'boolean',
            'object': 'any'
        }
        
        if schema_type == 'array':
            items = schema.get('items', {})
            item_type = self._get_typescript_type(items)
            return f"{item_type}[]"
        
        return type_mapping.get(schema_type, 'any')
    
    def generate_actions(self, operations: List[Dict]):
        """Generate NgRx actions"""
        actions_dir = self.output_dir / "actions"
        actions_dir.mkdir(parents=True, exist_ok=True)
        
        # Group operations by tags
        grouped_operations = {}
        for op in operations:
            tag = op['tags'][0] if op['tags'] else 'default'
            if tag not in grouped_operations:
                grouped_operations[tag] = []
            grouped_operations[tag].append(op)
        
        for tag, tag_operations in grouped_operations.items():
            actions_content = self._generate_actions_content(tag, tag_operations)
            actions_file = actions_dir / f"{tag.lower()}.actions.ts"
            
            with open(actions_file, 'w') as f:
                f.write(actions_content)
    
    def _generate_actions_content(self, tag: str, operations: List[Dict]) -> str:
        """Generate actions content for a specific tag"""
        tag_pascal = self._to_pascal_case(tag)
        
        content = [
            "import { createAction, props } from '@ngrx/store';",
            "",
            f"// {tag_pascal} Actions",
            ""
        ]
        
        for op in operations:
            op_name = self._to_camel_case(op['operationId'])
            op_pascal = self._to_pascal_case(op['operationId'])
            
            # Start action
            params = []
            if op['parameters']:
                params.append(f"{', '.join(op['parameters'])}: string")
            if op['requestBody']:
                params.append("payload: any")
            
            if params:
                content.append(f"export const {op_name} = createAction(")
                content.append(f"  '[{tag_pascal}] {op_pascal}',")
                content.append(f"  props<{{ {'; '.join(params)} }}>()")
                content.append(");")
            else:
                content.append(f"export const {op_name} = createAction('[{tag_pascal}] {op_pascal}');")
            
            # Success action
            content.append(f"export const {op_name}Success = createAction(")
            content.append(f"  '[{tag_pascal}] {op_pascal} Success',")
            content.append(f"  props<{{ data: {op['returnType']} }}>()")
            content.append(");")
            
            # Failure action
            content.append(f"export const {op_name}Failure = createAction(")
            content.append(f"  '[{tag_pascal}] {op_pascal} Failure',")
            content.append("  props<{ error: any }>()")
            content.append(");")
            content.append("")
        
        return '\n'.join(content)
    
    def generate_effects(self, operations: List[Dict]):
        """Generate NgRx effects"""
        effects_dir = self.output_dir / "effects"
        effects_dir.mkdir(parents=True, exist_ok=True)
        
        # Group operations by tags
        grouped_operations = {}
        for op in operations:
            tag = op['tags'][0] if op['tags'] else 'default'
            if tag not in grouped_operations:
                grouped_operations[tag] = []
            grouped_operations[tag].append(op)
        
        for tag, tag_operations in grouped_operations.items():
            effects_content = self._generate_effects_content(tag, tag_operations)
            effects_file = effects_dir / f"{tag.lower()}.effects.ts"
            
            with open(effects_file, 'w') as f:
                f.write(effects_content)
    
    def _generate_effects_content(self, tag: str, operations: List[Dict]) -> str:
        """Generate effects content for a specific tag"""
        tag_pascal = self._to_pascal_case(tag)
        tag_camel = self._to_camel_case(tag)
        
        content = [
            "import { Injectable } from '@angular/core';",
            "import { Actions, createEffect, ofType } from '@ngrx/effects';",
            "import { of } from 'rxjs';",
            "import { catchError, map, switchMap } from 'rxjs/operators';",
            f"import {{ {tag_pascal}Service }} from '../services/{tag.lower()}.service';",
            f"import * as {tag_pascal}Actions from '../actions/{tag.lower()}.actions';",
            "",
            "@Injectable()",
            f"export class {tag_pascal}Effects {{",
            "",
            f"  constructor(",
            f"    private actions$: Actions,",
            f"    private {tag_camel}Service: {tag_pascal}Service",
            f"  ) {{}}",
            ""
        ]
        
        for op in operations:
            op_name = self._to_camel_case(op['operationId'])
            op_pascal = self._to_pascal_case(op['operationId'])
            
            content.extend([
                f"  {op_name}$ = createEffect(() =>",
                f"    this.actions$.pipe(",
                f"      ofType({tag_pascal}Actions.{op_name}),",
                f"      switchMap((action) =>",
                f"        this.{tag_camel}Service.{op_name}(",
            ])
            
            # Add parameters
            params = []
            if op['parameters']:
                params.extend([f"action.{param}" for param in op['parameters']])
            if op['requestBody']:
                params.append("action.payload")
            
            if params:
                content.append(f"          {', '.join(params)}")
            
            content.extend([
                f"        ).pipe(",
                f"          map((data) => {tag_pascal}Actions.{op_name}Success({{ data }})),",
                f"          catchError((error) => of({tag_pascal}Actions.{op_name}Failure({{ error }})))",
                f"        )",
                f"      )",
                f"    )",
                f"  );",
                ""
            ])
        
        content.append("}")
        
        return '\n'.join(content)
    
    def generate_reducers(self, operations: List[Dict]):
        """Generate NgRx reducers"""
        reducers_dir = self.output_dir / "reducers"
        reducers_dir.mkdir(parents=True, exist_ok=True)
        
        # Group operations by tags
        grouped_operations = {}
        for op in operations:
            tag = op['tags'][0] if op['tags'] else 'default'
            if tag not in grouped_operations:
                grouped_operations[tag] = []
            grouped_operations[tag].append(op)
        
        for tag, tag_operations in grouped_operations.items():
            reducer_content = self._generate_reducer_content(tag, tag_operations)
            reducer_file = reducers_dir / f"{tag.lower()}.reducer.ts"
            
            with open(reducer_file, 'w') as f:
                f.write(reducer_content)
    
    def _generate_reducer_content(self, tag: str, operations: List[Dict]) -> str:
        """Generate reducer content for a specific tag"""
        tag_pascal = self._to_pascal_case(tag)
        tag_camel = self._to_camel_case(tag)
        
        content = [
            "import { createReducer, on } from '@ngrx/store';",
            f"import * as {tag_pascal}Actions from '../actions/{tag.lower()}.actions';",
            "",
            f"export interface {tag_pascal}State {{",
            "  loading: boolean;",
            "  error: any;",
        ]
        
        # Add state properties for each operation
        for op in operations:
            op_name = self._to_camel_case(op['operationId'])
            content.append(f"  {op_name}Data: {op['returnType']} | null;")
        
        content.extend([
            "}",
            "",
            f"export const initial{tag_pascal}State: {tag_pascal}State = {{",
            "  loading: false,",
            "  error: null,",
        ])
        
        for op in operations:
            op_name = self._to_camel_case(op['operationId'])
            content.append(f"  {op_name}Data: null,")
        
        content.extend([
            "};",
            "",
            f"export const {tag_camel}Reducer = createReducer(",
            f"  initial{tag_pascal}State,",
        ])
        
        # Add reducer cases
        for op in operations:
            op_name = self._to_camel_case(op['operationId'])
            
            content.extend([
                f"  on({tag_pascal}Actions.{op_name}, (state) => ({{",
                "    ...state,",
                "    loading: true,",
                "    error: null",
                "  })),",
                f"  on({tag_pascal}Actions.{op_name}Success, (state, {{ data }}) => ({{",
                "    ...state,",
                "    loading: false,",
                f"    {op_name}Data: data",
                "  })),",
                f"  on({tag_pascal}Actions.{op_name}Failure, (state, {{ error }}) => ({{",
                "    ...state,",
                "    loading: false,",
                "    error",
                "  })),",
            ])
        
        content.append(");")
        
        return '\n'.join(content)
    
    def generate_selectors(self, operations: List[Dict]):
        """Generate NgRx selectors"""
        selectors_dir = self.output_dir / "selectors"
        selectors_dir.mkdir(parents=True, exist_ok=True)
        
        # Group operations by tags
        grouped_operations = {}
        for op in operations:
            tag = op['tags'][0] if op['tags'] else 'default'
            if tag not in grouped_operations:
                grouped_operations[tag] = []
            grouped_operations[tag].append(op)
        
        for tag, tag_operations in grouped_operations.items():
            selector_content = self._generate_selector_content(tag, tag_operations)
            selector_file = selectors_dir / f"{tag.lower()}.selectors.ts"
            
            with open(selector_file, 'w') as f:
                f.write(selector_content)
    
    def _generate_selector_content(self, tag: str, operations: List[Dict]) -> str:
        """Generate selector content for a specific tag"""
        tag_pascal = self._to_pascal_case(tag)
        tag_camel = self._to_camel_case(tag)
        
        content = [
            "import { createFeatureSelector, createSelector } from '@ngrx/store';",
            f"import {{ {tag_pascal}State }} from '../reducers/{tag.lower()}.reducer';",
            "",
            f"export const select{tag_pascal}State = createFeatureSelector<{tag_pascal}State>('{tag_camel}');",
            "",
            f"export const select{tag_pascal}Loading = createSelector(",
            f"  select{tag_pascal}State,",
            f"  (state: {tag_pascal}State) => state.loading",
            ");",
            "",
            f"export const select{tag_pascal}Error = createSelector(",
            f"  select{tag_pascal}State,",
            f"  (state: {tag_pascal}State) => state.error",
            ");",
            ""
        ]
        
        for op in operations:
            op_name = self._to_camel_case(op['operationId'])
            op_pascal = self._to_pascal_case(op['operationId'])
            
            content.extend([
                f"export const select{op_pascal}Data = createSelector(",
                f"  select{tag_pascal}State,",
                f"  (state: {tag_pascal}State) => state.{op_name}Data",
                ");",
                ""
            ])
        
        return '\n'.join(content)
    
    def generate_services(self, operations: List[Dict]):
        """Generate Angular services"""
        services_dir = self.output_dir / "services"
        services_dir.mkdir(parents=True, exist_ok=True)
        
        # Group operations by tags
        grouped_operations = {}
        for op in operations:
            tag = op['tags'][0] if op['tags'] else 'default'
            if tag not in grouped_operations:
                grouped_operations[tag] = []
            grouped_operations[tag].append(op)
        
        for tag, tag_operations in grouped_operations.items():
            service_content = self._generate_service_content(tag, tag_operations)
            service_file = services_dir / f"{tag.lower()}.service.ts"
            
            with open(service_file, 'w') as f:
                f.write(service_content)
    
    def _generate_service_content(self, tag: str, operations: List[Dict]) -> str:
        """Generate service content for a specific tag"""
        tag_pascal = self._to_pascal_case(tag)
        
        content = [
            "import { Injectable } from '@angular/core';",
            "import { HttpClient } from '@angular/common/http';",
            "import { Observable } from 'rxjs';",
            "",
            "@Injectable({",
            "  providedIn: 'root'",
            "})",
            f"export class {tag_pascal}Service {{",
            f"  private baseUrl = '{self.base_url}';",
            "",
            "  constructor(private http: HttpClient) {}",
            ""
        ]
        
        for op in operations:
            op_name = self._to_camel_case(op['operationId'])
            method = op['method'].lower()
            path = op['path']
            
            # Build method signature
            params = []
            if op['parameters']:
                params.extend([f"{param}: string" for param in op['parameters']])
            if op['requestBody']:
                params.append("payload: any")
            
            param_str = ', '.join(params) if params else ''
            
            content.append(f"  {op_name}({param_str}): Observable<{op['returnType']}> {{")
            
            # Build URL
            url = f"`${{this.baseUrl}}{path}`"
            for param in op['parameters']:
                url = url.replace(f"{{{param}}}", f"${{{param}}}")
            
            # HTTP call
            if method == 'get' or method == 'delete':
                content.append(f"    return this.http.{method}<{op['returnType']}>({url});")
            else:
                if op['requestBody']:
                    content.append(f"    return this.http.{method}<{op['returnType']}>({url}, payload);")
                else:
                    content.append(f"    return this.http.{method}<{op['returnType']}>({url}, {{}});")
            
            content.append("  }")
            content.append("")
        
        content.append("}")
        
        return '\n'.join(content)
    
    def generate_index_files(self):
        """Generate barrel export index files"""
        # Main store index
        store_index = [
            "export * from './actions';",
            "export * from './effects';",
            "export * from './reducers';",
            "export * from './selectors';",
            "export * from './services';",
            "export * from './models';"
        ]
        
        with open(self.output_dir / "index.ts", 'w') as f:
            f.write('\n'.join(store_index))
        
        # Generate index files for each subdirectory
        subdirs = ['actions', 'effects', 'reducers', 'selectors', 'services']
        
        for subdir in subdirs:
            subdir_path = self.output_dir / subdir
            if subdir_path.exists():
                files = [f for f in subdir_path.glob("*.ts") if f.name != "index.ts"]
                exports = [f"export * from './{f.stem}';" for f in files]
                
                with open(subdir_path / "index.ts", 'w') as f:
                    f.write('\n'.join(exports))
    
    def generate_all(self):
        """Generate all NgRx files"""
        print(f"Generating NgRx files from {self.swagger_file}")
        print(f"Output directory: {self.output_dir}")
        
        # Create output directory
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Extract operations
        operations = self._extract_operations()
        print(f"Found {len(operations)} operations")
        
        # Generate all components
        print("Generating models...")
        self.generate_models()
        
        print("Generating actions...")
        self.generate_actions(operations)
        
        print("Generating effects...")
        self.generate_effects(operations)
        
        print("Generating reducers...")
        self.generate_reducers(operations)
        
        print("Generating selectors...")
        self.generate_selectors(operations)
        
        print("Generating services...")
        self.generate_services(operations)
        
        print("Generating index files...")
        self.generate_index_files()
        
        print("✅ NgRx generation completed!")


def main():
    parser = argparse.ArgumentParser(description='Generate NgRx files from Swagger/OpenAPI specification')
    parser.add_argument('swagger_file', help='Path to Swagger/OpenAPI file (.json or .yaml)')
    parser.add_argument('-o', '--output', default='./src/app/store', 
                       help='Output directory (default: ./src/app/store)')
    
    args = parser.parse_args()
    
    if not os.path.exists(args.swagger_file):
        print(f"❌ Error: Swagger file '{args.swagger_file}' not found")
        return
    
    try:
        generator = NgRxGenerator(args.swagger_file, args.output)
        generator.generate_all()
    except Exception as e:
        print(f"❌ Error: {str(e)}")


if __name__ == "__main__":
    main()
