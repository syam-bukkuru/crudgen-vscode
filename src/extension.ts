import * as vscode from 'vscode';
import { generateCrud } from './commands/generateCrud';

export function activate(context: vscode.ExtensionContext) {
  console.log('CRUDGen extension is active.');

  const helloCmd = vscode.commands.registerCommand('crudgen.helloWorld', () => {
    vscode.window.showInformationMessage('👋 Hello from CRUDGen!');
  });

  const crudCmd = vscode.commands.registerCommand('crudgen.generateCrud', async () => {
    await generateCrud(context);
  });

  context.subscriptions.push(helloCmd, crudCmd);
}

export function deactivate() {}
