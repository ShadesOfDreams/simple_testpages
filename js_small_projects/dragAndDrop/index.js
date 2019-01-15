let form = document.getElementById("uploadForm");
let fileInput = document.getElementById("upload-file");
let resultBox = document.getElementById("result");
let loading = document.getElementById("loading");
let averageMessageTime = 5000;
let uploadResult;
let uploadWaitInterval;
let uploadStatus = {
  inProgress: false,
  fileCount: 0,
  fileIndex: 0
}

/**
 * result box reseter
 * @param {number} timeout
 */
const emptyResultBox = function (timeout) {
  timeout = timeout || 0;
  setTimeout(function () {
    resultBox.className = "";
    resultBox.innerHTML = "";
  }, timeout);
};

fileInput.addEventListener("change", function (event) {
  let inputArr = event.target.files;
  if (inputArr.length > 0) {
    emptyResultBox();
    for (var i = 0; i < inputArr.length; i++) {
      fileArray.push(inputArr[i]);
      fillRowData(inputArr[i]);
    }
    gridOptions.api.setRowData(rowData);
    fileArrayChangeHandler();
  }
});

/**
 * changes the send button's width and toggle loading image display
 * @param {boolean} isLoading whether it is loading or not..
 */
const changeSendBtnStyle = function (isLoading) {
  if (isLoading) {
    sendBtn.classList.add("send-btn-wider")
    setTimeout(function () {
      loading.classList.remove("hidden");
    }, 200);

  } else {
    loading.classList.add("hidden");
    sendBtn.classList.remove("send-btn-wider")
  }
};

function StopProgress() {
  uploadStatus.inProgress = false;
  uploadStatus.fileCount--;
}

function ShowErrorRow(params) {
  document.querySelector(".ag-body-container [row-index='" + params + "']").classList.add('red');
  fileArray[params].error = true;
  gridOptions.api.getRowNode(params).data.error = true;
}

function RemoveRowClass() {
  let rows = document.querySelectorAll("[row-index]");
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    if (rows[rowIndex].classList.contains("red")) {
      rows[rowIndex].classList.remove("red");
    }
  }
}

/**
 * uploads one file
 * @param {Number} index index of file in fileArray
 * @returns {Promise} resolve xhr.status
 */
function uploadFile(index) {
  uploadStatus.inProgress = true;
  let xhr = new XMLHttpRequest();
  xhr.open("PUT", "./files/" + fileArray[index].name);
  xhr.onprogress = function () {
    resultBox.innerHTML = "Feltöltés...";
  }
  xhr.onload = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 201 || xhr.status === 200) {
        removeFile(index);
        uploadResult.success++;
        StopProgress();
      } else if (xhr.status === 204) {
        removeFile(index);
        uploadResult.overwrite++;
        StopProgress();
      } else if (xhr.status === 500) {
        resultBox.innerHTML = "Csatlakozási hiba";
        resultBox.classList.add("red");
        uploadStatus.fileCount = 0;
        StopProgress();
      }
    }
  };
  xhr.onerror = function () {
    uploadResult.failure++;
    StopProgress();
    uploadStatus.fileIndex++;
    ShowErrorRow(index);
  }
  xhr.send(fileArray[index]);
};
// function uploadFile(index) {
//   uploadStatus.inProgress = true;
//   let xhr = new XMLHttpRequest();
//   xhr.open("PUT", "./files/" + fileArray[index].name);
//   xhr.onprogress = function () {
//     resultBox.innerHTML = "Feltöltés...";
//   }
//   xhr.onload = function () {
//     if (xhr.readyState === 4) {
//       if (xhr.status === 201 || xhr.status === 200) {
//         removeFile(index);
//         uploadResult.success++;
//         StopProgress();
//       } else if (xhr.status === 204) {
//         removeFile(index);
//         uploadResult.overwrite++;
//         StopProgress();
//       } else if (xhr.status === 500) {
//         resultBox.innerHTML = "Csatlakozási hiba";
//         resultBox.classList.add("red");
//         uploadStatus.fileCount = 0;
//         StopProgress();
//       }
//     }
//   };
//   xhr.onerror = function () {
//     uploadResult.failure++;
//     StopProgress();
//     uploadStatus.fileIndex++;
//     ShowErrorRow(index);
//   }
//   xhr.send(fileArray[index]);
// };

/**
 * @description starts upload, sets styles before
 */
let waitForUpload = function () {
  sendBtn.disabled = true;
  uploadStatus.fileIndex = 0;
  uploadResult = {
    success: 0,
    overwrite: 0,
    failure: 0
  };
  uploadStatus.fileCount = fileArray.length;
  changeSendBtnStyle(true);
  resultBox.innerHTML = "Feltöltés indítása";
  RemoveRowClass();
  uploadWaitInterval = setInterval(function () {
    // no upload in progress
    if (!uploadStatus.inProgress) {
      // there is a file to upload...
      if (uploadStatus.fileCount > 0) {
        uploadFile(uploadStatus.fileIndex);
      } else { // no file to upload
        let strOut = [
          uploadResult.success ? uploadResult.success + " sikeres feltöltés" : "",
          uploadResult.overwrite ? uploadResult.overwrite + " sikeres felülírás" : "",
          uploadResult.failure ? uploadResult.failure + " sikertelen feltöltés" : ""
        ]
        resultBox.innerHTML = (strOut.filter(function (i) {
          return i !== "";
        })).join(", ");
        changeSendBtnStyle(false);
        emptyResultBox(averageMessageTime);
        fileInput.value = null;
        sendBtn.disabled = false;

        // stop interval
        clearInterval(uploadWaitInterval);
      }
    }
  }, 2000);
};

form.addEventListener("submit", function (event) {
  event.preventDefault();
  // do nothing if no files are given
  if (fileArray.length === 0) {
    // setImmediate(() => {
    resultBox.classList.add("red");
    resultBox.innerHTML = "Üres a mező!";
    emptyResultBox(averageMessageTime);
    // });
    return false;
  } else {
    waitForUpload();
  }
});