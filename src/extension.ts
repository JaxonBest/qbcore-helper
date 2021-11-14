// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "qbcore-helper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('qbcore-helper.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from qbcore-helper!');
	});

	let createPlugin = vscode.commands.registerCommand('qbcore-helper.CreatePlugin', (uri: vscode.Uri) => {
		// Get the name of the plugin.
		let pluginNameInputBox = vscode.window.createInputBox();
		pluginNameInputBox.placeholder = "QBCore Plugin Name";
		
		// const pluginName = vscode.window.showInputBox(pluginNameInputBox);

		const wsedit = new vscode.WorkspaceEdit();
		if (vscode.workspace.workspaceFolders === undefined) {
			vscode.window.showInformationMessage('You have to have at least one active vscode workspaces!');
			return;
		}
		const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
		const filePath = vscode.Uri.file(wsPath + '/client/client.lua');
		
		const serverFilePath = vscode.Uri.file(wsPath + "/server/server.lua");
		const fxManifestPath = vscode.Uri.file(wsPath + "/fxmanifest.lua");
		
		const fxManifestContent = `fx_version 'cerulean'\ngame 'gta5'\n\nauthor ''\ndescription ''\nversion '1.0.0'\n\nclient_script 'client/client.lua'\nserver_script 'server/server.lua'\n\nshared_scripts {\n\t'@qb-core/import.lua'\n}`; 

		vscode.window.showInformationMessage("Creating Files..");
		
		wsedit.createFile(filePath, { ignoreIfExists: true });
		wsedit.createFile(serverFilePath, { ignoreIfExists: true });
		wsedit.createFile(fxManifestPath, { ignoreIfExists: true });

		function sleep(ms : number) {
			return new Promise((resolve) => {
				setTimeout(resolve, ms);
			});
		}
		vscode.workspace.applyEdit(wsedit);
		console.log('Applied Edit');
		
		// Write to fx manifest.
		sleep(1200);
		console.log('Working...');

		// vscode.workspace.openTextDocument(fxManifestPath).then((a: vscode.TextDocument) => {
		// 	vscode.window.showTextDocument(a, 1, false).then(e => {
		// 		e.edit(edit => {
		// 			edit.insert(new vscode.Position(0, 0), fxManifestContent);
		// 		});
		// 	});
		// }, (error: any) => {
		// 	console.error(error);
		// });

		// vscode.workspace.openTextDocument(serverFilePath).then((a: vscode.TextDocument) => {
		// 	vscode.window.showTextDocument(a, 1, false).then(e => {
		// 		e.edit(edit => {
		// 			edit.insert(new vscode.Position(0, 0), (`-- Main Server Script.\n-- local QBCore = exports['qb-core']:GetCoreObject()`));
		// 		});
		// 	});
		// }, (error: any) => {
		// 	console.error(error);
		// });

		// vscode.workspace.openTextDocument(filePath).then((a: vscode.TextDocument) => {
		// 	vscode.window.showTextDocument(a, 1, false).then(e => {
		// 		e.edit(edit => {
		// 			edit.insert(new vscode.Position(0, 0), (`-- Main Client Script.\n-- local QBCore = exports['qb-core']:GetCoreObject()`));
		// 		});
		// 	});
		// }, (error: any) => {
		// 	console.error(error);
		// });

		vscode.window.showInformationMessage('Created QBCore Plugin');
	});



	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}