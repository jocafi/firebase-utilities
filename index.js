const fs = require("fs");

if (process.argv.length < 6) {
  const errMsg = "\n\nSyntax: node transform.js sourceFilename targetFilename stringFrom stringTo"
    + "\n\nExample:  node transform.js file1.txt file2.txt ',' '@'\n\n";
  console.error(errMsg);
  return;
}

const sourceFilename = process.argv[2],
      targetFilename = process.argv[3],
      stringFrom = process.argv[4],
      stringTo = process.argv[5];

function validateFiles(sourceFilename, targetFilename) {
  if (!sourceFilename || !targetFilename) {
    console.error("Please, enter the arguments: source filename and target filename.");
    return false;
  }

  if (sourceFilename === targetFilename) {
    console.error("The source file '" + sourceFilename + "' must be different from the target '" + targetFilename + "'");
    return false;
  }

  if (!fs.existsSync(sourceFilename)) {
    console.error("The file '" + sourceFilename + "' does not exist.");
    return false;
  }

  return true;
}

function transformSeparationSymbol(sourceFilename, targetFilename, stringFrom, stringTo) {
  if (!validateFiles(sourceFilename, targetFilename)) {
    return;
  }

  if (!stringFrom || !stringTo) {
    console.error("Please, enter the arguments in the same order: sourceFilename, targetFilename, stringFrom, stringTo");
    return false;
  }  

  if (stringFrom === stringTo) {
    console.error("The string FROM '" + stringFrom + "' must be different from the string TO '" + stringTo + "'");
    return;
  }

  const data = readFile(sourceFilename);
  if (!data) {
    return;
  }

  console.log("Starting replacing '" + stringFrom + "' by '" + stringTo + "'.");
  const regex = new RegExp(stringFrom, "g");
  const newData = data.replace(regex, stringTo);
  
  // console.log(newData);
  writeFile(targetFilename, newData);
  console.log("Success! The file '" + targetFilename + "' was created.");
}

function readFile(sourceFilename) {
  try {
    const data = fs.readFileSync(sourceFilename, "utf8");
    if (!data || data==="") {
      console.error("The file '" + sourceFilename + "' is empty. The process has been cancelled.");
      return null;
    }

    return data;
  } catch (error) {
    console.error("An error occurred while reading the file '" + sourceFilename + "'. Error: " + error);
    return null;
  }
}

function writeFile(targetFilename, data) {
  try {
    fs.writeFileSync(targetFilename, data, "utf8");
  } catch (error) {
    console.error("An error occurred while writing the file '" + targetFilename + "'. Error: " + error);
  }
}

transformSeparationSymbol(sourceFilename, targetFilename, stringFrom, stringTo);
