let containerInfo = document.getElementById('container-info');

const buildTable = (objectData, titleTable) => {
  let table = document.createElement('table');
  
  table.setAttribute('class', 'table table-striped');
  table.appendChild(buildHeader(titleTable));
  table.appendChild(buildBody(objectData));
  containerInfo.appendChild(table);
};

const buildHeader = (titleTable) => {
  let tableHead = document.createElement('thead');
  let header = document.createElement('th');
  let headerRow = document.createElement('tr');

  header.appendChild(titleTable);
  header.setAttribute('colspan', '2')
  headerRow.appendChild(header);
  tableHead.appendChild(headerRow);
  
  return tableHead;
};

const buildBody = (objectData) => {
  let tableBody = document.createElement('tbody');

  Object.entries(objectData).forEach((data) => {
    let row = document.createElement('tr');

    data.forEach(dataText => {
      let textNodeBody = document.createTextNode(dataText);
      let cell = document.createElement('td');

      cell.appendChild(textNodeBody);
      row.appendChild(cell);
    });
    
    tableBody.appendChild(row);
  });

  return tableBody;
};