var fs = require("fs");

var curDir = 'D:/Deployment/Mis2'; //folder absolute path which contains the to-be-deleted files/folders 
var arr = ['ckeditor', 
'Images', 
'logs', 
'BatchGoalYearDefinition.xml', 
'entlib.exe.config',
'PrecompiledApp.config', 
'Web.Config',
'Templates/Pdf', 
'PPLContribution/Images', 
'PPLCommon/Images', 
'PPLPublication/Images', 
'PPLStats/Images', 
'PPLContribution/Views/Resource/Tool']; //list of to-be-deleted files/folders

function deleteFolderRecursive(path) {
  if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file) {
        var curPath = path + "/" + file;
          if(fs.lstatSync(curPath).isDirectory()) { 
              deleteFolderRecursive(curPath);
          } else { 
              fs.unlinkSync(curPath);
          }
      });
      fs.rmdirSync(path);
    }
}

function walk(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results.push(file);
            results = results.concat(walk(file));
        } else { 
            results.push(file);
        }
    });
    return results;
}

//run

var files= walk(curDir); 
var count = 0;

for(var i = 0;i<files.length;i++)
{
    var file = files[i];
    for(var j= 0;j<arr.length;j++)
    {
        if(file == (curDir + '/' + arr[j])){
        	var path = file;
            count++;
            if(fs.lstatSync(path).isDirectory() ){
                console.log('Deleting folder: ' + file);
                deleteFolderRecursive(path);
            }else{
                console.log('Deleting file: ' + file);
                fs.unlinkSync(path);
            }break;
        }
    }
}
console.log('Done! Deleted ' + count + ' files/folders');
