// 获取表格和表单
const tableBody = document.querySelector("#repairTable tbody");
const form = document.getElementById("repairForm");

// 添加记录到表格
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${document.getElementById("date").value}</td>
        <td>${document.getElementById("customer").value}</td>
        <td>${document.getElementById("location").value}</td>
        <td>${document.getElementById("problem").value}</td>
        <td>${document.getElementById("solution").value}</td>
        <td>${document.getElementById("duration").value}</td>
        <td>${document.getElementById("cost").value}</td>
        <td>${document.getElementById("technician").value}</td>
        <td>${document.getElementById("notes").value}</td>
        <td>
            <button class="edit-btn" onclick="editRow(this)">编辑</button>
            <button class="delete-btn" onclick="deleteRow(this)">删除</button>
        </td>
    `;
    tableBody.appendChild(newRow);

    // 清空表单
    form.reset();
});

// 编辑记录
function editRow(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");

    // 获取当前记录的值
    const values = Array.from(cells).map((cell, index) => {
        if (index === cells.length - 1) return; // 跳过操作列
        return cell.textContent;
    });

    // 填充表单
    document.getElementById("date").value = values[0];
    document.getElementById("customer").value = values[1];
    document.getElementById("location").value = values[2];
    document.getElementById("problem").value = values[3];
    document.getElementById("solution").value = values[4];
    document.getElementById("duration").value = values[5];
    document.getElementById("cost").value = values[6];
    document.getElementById("technician").value = values[7];
    document.getElementById("notes").value = values[8];

    // 删除当前行
    row.remove();
}

// 删除记录
function deleteRow(button) {
    const row = button.closest("tr");
    row.remove();
}

// 导出表格到Excel
function exportTableToExcel() {
    const table = document.getElementById("repairTable");
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "空调维修记录.xlsx");
}