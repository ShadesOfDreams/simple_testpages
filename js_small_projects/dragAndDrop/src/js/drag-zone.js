let sendBtn = document.getElementById("send-btn");
let overlay = document.getElementById("drag-overlay");
let dropZone = document.getElementById("drop-zone");
let eGridDiv = document.getElementById("drop-grid");
let fileCounter = document.getElementById("file-counter");
let rowData = [];

let fileArray = [];
// use when file count change
fileCounter.innerHTML = "Nincs fájl kijelölve";
const fileArrayChangeHandler = function() {
    fileCounter.innerHTML = fileArray.length > 0 ? fileArray.length +' kiválasztott fájl' : "Nincs fájl kijelölve";
}

const removeFile = function(index) {
    rowData.splice(index, 1);
    fileArray.splice(index, 1);
    refreshFiles();
}

const refreshFiles = function() {
    gridOptions.api.setRowData(rowData);
    fileArrayChangeHandler();
}

/**
 * 
 * @param {File} file push in file to array
 */
const fillRowData = function(file) {
    rowData.push({
        name: file.name,
        type: file.type,
        size: fileSizeToString(file.size),
        delete: ""
    });
}

const deleteRow = function(event) {
    let id = (event.target.id).split('-')[1];
    removeFile(id);
}

let columnDefs = [{
        headerName: "Fájlnév",
        field: "name",
        tooltipField: "name"
    },
    {
        headerName: "Típus",
        field: "type",
        width: 150,
        tooltipField: "type"
    },
    {
        headerName: "Méret",
        field: "size",
        width: 100
    },
    {
        headerName: "Törlés",
        field: "delete",
        width: 80,
        cellRenderer: function(params)
            {return "<div class='del-icon' id='del-" + params.rowIndex + " onclick='deleteRow(event)'></div>";}
    }
];

let gridOptions = {
    columnDefs: columnDefs,
    rowData: [],
    enableColResize: false,
    suppressRowClickSelection: true,
    overlayNoRowsTemplate: "Húzd ide a fájlokat",
    getRowClass : function (params) {
        if(params.data.error){
            return "red";
        }
        return "";
    }
};

new agGrid.Grid(eGridDiv, gridOptions);
gridOptions.api.sizeColumnsToFit();

// drop zone events
let counter = 0;
dropZone.addEventListener("dragenter", function(event) {
    counter++;
    overlay.classList.remove("hidden");
    event.preventDefault();
});

dropZone.addEventListener("dragleave", function() {
    counter--;
    if (counter === 0) {
        overlay.classList.add("hidden");
    }
});

// disable window drag and drop event
window.addEventListener("dragover", function(event) {
    event.preventDefault();
}, false);

window.addEventListener("drop", function(event) {
    event.preventDefault();
}, false);

// drag and drop handling
dropZone.addEventListener("dragover", function(event) {
    event.preventDefault();
});

dropZone.addEventListener("drop", function(event) {
    event.preventDefault();
    if(event.dataTransfer.files){
        emptyResultBox();
        for (let i = 0; i < event.dataTransfer.files.length; i++) {
            let file = event.dataTransfer.files[i];
            if(file &&
                file.type || file.size){
                    fileArray.push(file);
                    fillRowData(file);
            } else{
                console.log('file is' + file);
            }
        }
    }
    overlay.classList.add("hidden");
    removeDragData(event);
    refreshFiles();
});

const removeDragData = function(event) {
    if(event.dataTransfer.items){
        event.dataTransfer.items.clear();
    } else{
        event.dataTransfer.clearData();
    }
}

// display file size
const units = ["B", "KB", "MB", "GB"];
let divisionCount = 0;
const fileSizeToString = function(size) {
    while (size >= 1024) {
        size /= 1024;
        divisionCount++;
    }
    size = size + "";
    if (size.indexOf(".") > -1) {
        size = size.slice(0, size.indexOf('.') + 3);
    }
    size = size + ' ' + units[divisionCount];
    divisionCount = 0;
    return size;
}