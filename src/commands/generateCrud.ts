import * as vscode from 'vscode';

export async function generateCrud(context: vscode.ExtensionContext) {
  // Step 1: Ask for JSON Schema
  const jsonSchemaInput = await vscode.window.showInputBox({
    prompt: 'Paste your JSON schema (as plain text)',
    placeHolder: '{ "User": { "name": "string", "email": "string" } }',
    validateInput: (value) => {
      try {
        JSON.parse(value);
        return null;
      } catch {
        return 'Invalid JSON format';
      }
    }
  });

  if (!jsonSchemaInput) {
    vscode.window.showWarningMessage('❗ JSON schema input cancelled.');
    return;
  }

  // Step 2: Ask for MongoDB URI
  const mongoUri = await vscode.window.showInputBox({
    prompt: 'Enter your MongoDB connection string',
    placeHolder: 'mongodb+srv://username:password@cluster.mongodb.net/mydb',
    validateInput: (value) => {
      if (!value.startsWith('mongodb')) return 'Invalid MongoDB connection string.';
      return null;
    }
  });

  if (!mongoUri) {
    vscode.window.showWarningMessage('❗ MongoDB URI input cancelled.');
    return;
  }

  // Step 3: Display confirmation
  vscode.window.showInformationMessage(
    '✅ CRUDGen Inputs received successfully!',
    'View Summary'
  ).then(async (action) => {
    if (action === 'View Summary') {
      const schemaPreview = JSON.stringify(JSON.parse(jsonSchemaInput), null, 2);
      const preview = `**JSON Schema:**\n\`\`\`json\n${schemaPreview}\n\`\`\`\n**Mongo URI:**\n\`\`\`${mongoUri}\`\`\``;

      const doc = await vscode.workspace.openTextDocument({
        content: preview,
        language: 'markdown'
      });
      await vscode.window.showTextDocument(doc, { preview: true });
    }
  });

  // Step 4: Store in global state (for next use)
  context.globalState.update('crudgen.schema', jsonSchemaInput);
  context.globalState.update('crudgen.mongoUri', mongoUri);
}
