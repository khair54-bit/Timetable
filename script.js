// Fungsi untuk memuat tabel dari JSON
function loadTable() {
    $.ajax({
        url: 'system/read.php',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            const tbody = $('#time-table tbody');
            tbody.empty(); // Kosongkan isi tabel

            data.data.forEach(row => {
                const tr = `
                    <tr data-row="${row.id}">
                        <td class="editable-time" data-column="time">${row.time}</td>
                        <td class="editable-cell" data-column="monday">${row.monday}</td>
                        <td class="editable-cell" data-column="tuesday">${row.tuesday}</td>
                        <td class="editable-cell" data-column="wednesday">${row.wednesday}</td>
                        <td class="editable-cell" data-column="thursday">${row.thursday}</td>
                        <td class="editable-cell" data-column="friday">${row.friday}</td>
                        <td>
                            <i class="fas fa-trash delete-row-btn" data-row="${row.id}"></i>
                        </td>
                    </tr>`;
                tbody.append(tr);
            });
        },
        error: function (xhr, status, error) {
            console.error(xhr, status, error);
            alert('Failed to load data!');
        }
    });
}

// Tambah Data
$('#add-row').on('click', function () {
    $('#StartTime').val(''); // Set start time in modal
    $('#EndTime').val(''); // Set end time in modal
    $('#editTimeModal').modal('show');
    $('#editTimeModal .modal-title').text("Tambah List");
    dataUrl = 'system/write.php';
});

// Editable content cells
$('#time-table').on('click', '.editable-cell', function () {
    currentCell = $(this); // Simpan referensi sel yang diklik
    currentRow = $(this).closest('tr').data('row'); // Ambil indeks baris
    currentColumn = $(this).data('column'); // Ambil kolom yang diubah
    const cellContent = currentCell.text().trim(); // Ambil konten sel
    $('#cellContent').val(cellContent); // Set konten di modal
    $('#editModal').modal('show'); // Tampilkan modal
    dataUrl = 'system/update.php';
});

// Editable time cells
$('#time-table').on('click', '.editable-time', function () {
    currentCell = $(this); // Store the clicked time cell
    currentRow = $(this).closest('tr').data('row'); // Ambil indeks baris
    currentColumn = $(this).data('column'); // Ambil kolom yang diubah
    const timeText = currentCell.text().trim();
    const [startTime, endTime] = timeText.split(' - '); // Split start and end time
    $('#StartTime').val(startTime); // Set start time in modal
    $('#EndTime').val(endTime); // Set end time in modal
    $('#editTimeModal .modal-title').text("Edit Time Slot");
    $('#editTimeModal').modal('show'); // Show the modal
    dataUrl = 'system/update.php';
});

// Save changes to content cells
$('#saveChanges').on('click', function () {
    const updatedContent = $('#cellContent').val().trim(); // Ambil konten baru
    if (currentCell && currentRow !== undefined && currentColumn) {
        $.ajax({
            url: 'system/update.php',
            method: 'POST',
            data: {
                row: currentRow,
                column: currentColumn,
                value: updatedContent
            },
            success: function (response) {
                if (response.success) {
                    currentCell.text(updatedContent); // Perbarui tampilan sel
                    $('#editModal').modal('hide'); // Tutup modal
                } else {
                    alert('Failed to update data!');
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr, status, error);
                alert('Error while updating data.');
            }
        });
    }
});

// Save changes to time cells
$('#saveTimeChanges').on('click', function () {
    const headerText = $('#editTimeModal .modal-title').text();
    const startTime = $('#StartTime').val().trim();
    const endTime = $('#EndTime').val().trim();
    const timeSlot = `${startTime} - ${endTime}`;
    const row = {
        time: timeSlot,
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: ""
    };
    if (startTime && endTime) {
        if (headerText == "Edit Time Slot") {
            if (currentCell && currentRow !== undefined && currentColumn) {
                $.ajax({
                    url: 'system/update.php',
                    method: 'POST',
                    data: {
                        row: currentRow,
                        column: currentColumn,
                        value: timeSlot
                    },
                    success: function (response) {
                        if (response.success) {
                            currentCell.text(timeSlot); // Perbarui tampilan sel
                            $('#editTimeModal').modal('hide'); // Tutup modal
                        } else {
                            alert('Failed to update data!');
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error(xhr, status, error);
                        alert('Error while updating data.');
                    }
                });
            }
        } else {
            // Ambil data saat ini, tambahkan baris baru, lalu simpan kembali
            data = {
                time: timeSlot,
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: ''
            };
            saveData(data);
            $('#editTimeModal').modal('hide');
            $('#startTime').val('');
            $('#endTime').val('');
        }
    } else {
        alert('Please enter valid start and end times.');
    }
});

// Muat tabel saat halaman dimuat
loadTable();

// Hapus baris
$('#time-table').on('click', '.delete-row-btn', function () {
    const rowToDelete = $(this).data('row');
    if (confirm('Are you sure you want to delete this row?')) {
        $.ajax({
            url: 'system/delete.php',
            method: 'POST',
            data: {
                row: rowToDelete
            },
            success: function (response) {
                if (response.success) {
                    loadTable(); // Muat ulang tabel setelah hapus
                } else {
                    alert('Failed to delete row!');
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr, status, error);
                alert('Error while deleting row.');
            }
        });
    }
});

// Fungsi untuk menyimpan data baru ke JSON
function saveData(newData) {
    $.ajax({
        url: dataUrl,
        method: 'POST',
        data: newData,
        success: function (response) {
            if (response.success) {
                loadTable(); // Reload tabel setelah menyimpan
            } else {
                alert('Failed to get data!');
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr, status, error);
            alert('Error while get data.');
        }
    });
}

// Initialize timepicker
$('.timepicker').timepicker({
    timeFormat: 'h:i A',
    interval: 30,
    minTime: '6:00 AM',
    maxTime: '10:00 PM',
    dynamic: true,
    dropdown: true,
    scrollbar: false
});