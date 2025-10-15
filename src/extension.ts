import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('CRUDGen extension is now active!');

  const disposable = vscode.commands.registerCommand('crudgen.helloWorld', async () => {
    vscode.window.showInformationMessage('👋 Hello from CRUDGen! Ready to generate CRUD magic.');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
