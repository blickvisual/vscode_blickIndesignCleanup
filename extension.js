const vscode = require('vscode');
const REPLACE = String.fromCharCode(173);

function activate(context) {

    console.log('Congratulations, your extension "indesigncleanup" is now active!');

    let disposable = vscode.commands.registerCommand('extension.blickIndesignCleanup', function () {

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        
        let ranges = [];
        let index = editor.document.getText().indexOf(REPLACE);
        while(index >= 0)
        {
          console.log(index);
          let text = editor.document.getText();
          //let index = text.indexOf(String.fromCharCode(173));
          let positionStart = editor.document.positionAt(index);
          let positionEnd = new vscode.Position(positionStart.line, positionStart.character + 1);
          let range = new vscode.Range(positionStart, positionEnd)

          ranges.push(range);
  
          index = editor.document.getText().indexOf(REPLACE, index + 1);
        }
        
        editor.edit(function(editBuilder) {
          for(var i = 0; i < ranges.length; i++)
          {
            editBuilder.replace(ranges[i], '');
          }
        });
          
        console.log("Fertig");


        vscode.window.showInformationMessage(ranges.length + ' Zeichen ersetzt :)');

    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;