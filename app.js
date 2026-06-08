/* ==========================================
   DEMS - Diamond Employee Management System
   Application Logic
   ========================================== */

// ==========================================
// MOCK DATA
// ==========================================
const employees = [
    { id: 'EMP-001', name: 'Amit Patel', department: 'Cutting', contact: '9876543210', salaryType: 'Fixed', status: 'Active', salary: 25000, dailyRate: 0, pieceRate: 0 },
    { id: 'EMP-002', name: 'Priya Sharma', department: 'Polishing', contact: '9876543211', salaryType: 'Piece-Based', status: 'Active', salary: 0, dailyRate: 0, pieceRate: 45 },
    { id: 'EMP-003', name: 'Rahul Desai', department: 'Cutting', contact: '9876543212', salaryType: 'Fixed', status: 'Active', salary: 28000, dailyRate: 0, pieceRate: 0 },
    { id: 'EMP-004', name: 'Sunita Joshi', department: 'Grading', contact: '9876543213', salaryType: 'Daily Wage', status: 'Active', salary: 0, dailyRate: 800, pieceRate: 0 },
    { id: 'EMP-005', name: 'Vikram Singh', department: 'Polishing', contact: '9876543214', salaryType: 'Fixed', status: 'Active', salary: 22000, dailyRate: 0, pieceRate: 0 },
    { id: 'EMP-006', name: 'Neha Verma', department: 'Admin', contact: '9876543215', salaryType: 'Fixed', status: 'Active', salary: 30000, dailyRate: 0, pieceRate: 0 },
    { id: 'EMP-007', name: 'Karan Mehta', department: 'Cutting', contact: '9876543216', salaryType: 'Piece-Based', status: 'Active', salary: 0, dailyRate: 0, pieceRate: 50 },
    { id: 'EMP-008', name: 'Deepa Nair', department: 'Grading', contact: '9876543217', salaryType: 'Fixed', status: 'Inactive', salary: 20000, dailyRate: 0, pieceRate: 0 },
    { id: 'EMP-009', name: 'Rajesh Kumar', department: 'Polishing', contact: '9876543218', salaryType: 'Daily Wage', status: 'Active', salary: 0, dailyRate: 750, pieceRate: 0 },
    { id: 'EMP-010', name: 'Anita Gupta', department: 'Admin', contact: '9876543219', salaryType: 'Fixed', status: 'Active', salary: 35000, dailyRate: 0, pieceRate: 0 },
    { id: 'EMP-011', name: 'Manoj Tiwari', department: 'Cutting', contact: '9876543220', salaryType: 'Daily Wage', status: 'Active', salary: 0, dailyRate: 900, pieceRate: 0 },
    { id: 'EMP-012', name: 'Fatima Sheikh', department: 'Polishing', contact: '9876543221', salaryType: 'Piece-Based', status: 'Active', salary: 0, dailyRate: 0, pieceRate: 55 },
];

const payrollData = [
    { id: 'EMP-001', name: 'Amit Patel', department: 'Cutting', payType: 'Fixed', workingDays: 26, gross: 25000, deductions: 2500, net: 22500 },
    { id: 'EMP-002', name: 'Priya Sharma', department: 'Polishing', payType: 'Piece-Based', workingDays: 24, gross: 31500, deductions: 3150, net: 28350 },
    { id: 'EMP-003', name: 'Rahul Desai', department: 'Cutting', payType: 'Fixed', workingDays: 26, gross: 28000, deductions: 2800, net: 25200 },
    { id: 'EMP-004', name: 'Sunita Joshi', department: 'Grading', payType: 'Daily Wage', workingDays: 22, gross: 17600, deductions: 1760, net: 15840 },
    { id: 'EMP-005', name: 'Vikram Singh', department: 'Polishing', payType: 'Fixed', workingDays: 26, gross: 22000, deductions: 2200, net: 19800 },
    { id: 'EMP-006', name: 'Neha Verma', department: 'Admin', payType: 'Fixed', workingDays: 26, gross: 30000, deductions: 3000, net: 27000 },
    { id: 'EMP-007', name: 'Karan Mehta', department: 'Cutting', payType: 'Piece-Based', workingDays: 25, gross: 35000, deductions: 3500, net: 31500 },
    { id: 'EMP-008', name: 'Deepa Nair', department: 'Grading', payType: 'Fixed', workingDays: 0, gross: 0, deductions: 0, net: 0 },
    { id: 'EMP-009', name: 'Rajesh Kumar', department: 'Polishing', payType: 'Daily Wage', workingDays: 23, gross: 17250, deductions: 1725, net: 15525 },
    { id: 'EMP-010', name: 'Anita Gupta', department: 'Admin', payType: 'Fixed', workingDays: 26, gross: 35000, deductions: 3500, net: 31500 },
    { id: 'EMP-011', name: 'Manoj Tiwari', department: 'Cutting', payType: 'Daily Wage', workingDays: 24, gross: 21600, deductions: 2160, net: 19440 },
    { id: 'EMP-012', name: 'Fatima Sheikh', department: 'Polishing', payType: 'Piece-Based', workingDays: 25, gross: 38500, deductions: 3850, net: 34650 },
];

// Attendance state: employee id -> 'present' | 'absent' | 'halfday' | null
const attendanceState = {};

// ==========================================
// DOM REFERENCES
// ==========================================
const loginPage = document.getElementById('login-page');
const appLayout = document.getElementById('app-layout');
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const navLinks = document.querySelectorAll('.nav-link[data-page]');
const logoutBtn = document.getElementById('logout-btn');
const pageTitle = document.getElementById('page-title');
const pageBreadcrumb = document.getElementById('page-breadcrumb');

const addEmployeeBtn = document.getElementById('add-employee-btn');
const employeeModal = document.getElementById('employee-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const employeeForm = document.getElementById('employee-form');
const modalTitle = document.getElementById('modal-title');

const saveAttendanceBtn = document.getElementById('save-attendance-btn');
const exportPayrollBtn = document.getElementById('export-payroll-btn');

const toastContainer = document.getElementById('toast-container');

// ==========================================
// PAGE ROUTING
// ==========================================
const pageTitles = {
    dashboard: { title: 'Dashboard', breadcrumb: 'Home / Dashboard' },
    employees: { title: 'Employee Management', breadcrumb: 'Home / Employee Management' },
    attendance: { title: 'Attendance', breadcrumb: 'Home / Attendance' },
    payroll: { title: 'Payroll', breadcrumb: 'Home / Payroll' },
    reports: { title: 'Reports', breadcrumb: 'Home / Reports' },
};

function navigateTo(page) {
    // Update nav links
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });

    // Update views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    const targetView = document.getElementById(`view-${page}`);
    if (targetView) {
        // Slight delay for transition
        requestAnimationFrame(() => {
            targetView.classList.add('active');
        });
    }

    // Update top bar
    const info = pageTitles[page];
    if (info) {
        pageTitle.textContent = info.title;
        pageBreadcrumb.textContent = info.breadcrumb;
    }

    // Close mobile sidebar
    sidebar.classList.remove('open');
    removeSidebarOverlay();

    // Trigger page-specific initializations
    if (page === 'dashboard') {
        animateMetrics();
        animateProgressBars();
    }
    if (page === 'attendance') {
        updateAttendanceStats();
    }
}

// ==========================================
// LOGIN
// ==========================================
loginBtn.addEventListener('click', handleLogin);
loginForm.addEventListener('submit', handleLogin);

function handleLogin(e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    let valid = true;

    // Validate
    const usernameGroup = usernameInput.closest('.form-group');
    const passwordGroup = passwordInput.closest('.form-group');

    if (!username) {
        usernameGroup.classList.add('error');
        showLoginError(usernameGroup, 'Username is required');
        valid = false;
    } else {
        usernameGroup.classList.remove('error');
    }

    if (!password) {
        passwordGroup.classList.add('error');
        showLoginError(passwordGroup, 'Password is required');
        valid = false;
    } else {
        passwordGroup.classList.remove('error');
    }

    if (!valid) return;

    // Mock login — any credentials accepted
    loginPage.style.opacity = '0';
    setTimeout(() => {
        loginPage.classList.remove('active');
        loginPage.style.display = 'none';
        appLayout.classList.remove('hidden');
        appLayout.style.opacity = '0';
        requestAnimationFrame(() => {
            appLayout.style.transition = 'opacity 0.5s ease';
            appLayout.style.opacity = '1';
        });
        navigateTo('dashboard');
        showToast('success', 'Welcome back, Rajesh!');
    }, 400);
}

function showLoginError(group, message) {
    let errorEl = group.querySelector('.error-message');
    if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'error-message';
        group.appendChild(errorEl);
    }
    errorEl.textContent = message;
}

// Clear errors on input
usernameInput.addEventListener('input', () => {
    usernameInput.closest('.form-group').classList.remove('error');
});
passwordInput.addEventListener('input', () => {
    passwordInput.closest('.form-group').classList.remove('error');
});

// ==========================================
// NAVIGATION
// ==========================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(link.dataset.page);
    });
});

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    appLayout.style.opacity = '0';
    setTimeout(() => {
        appLayout.classList.add('hidden');
        appLayout.style.opacity = '';
        loginPage.style.display = '';
        loginPage.classList.add('active');
        requestAnimationFrame(() => {
            loginPage.style.opacity = '1';
        });
        usernameInput.value = '';
        passwordInput.value = '';
    }, 400);
});

// Mobile sidebar
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    if (sidebar.classList.contains('open')) {
        addSidebarOverlay();
    } else {
        removeSidebarOverlay();
    }
});

function addSidebarOverlay() {
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay show';
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            removeSidebarOverlay();
        });
        document.body.appendChild(overlay);
    } else {
        overlay.classList.add('show');
    }
}

function removeSidebarOverlay() {
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) overlay.classList.remove('show');
}

// ==========================================
// DASHBOARD ANIMATIONS
// ==========================================
function animateMetrics() {
    const metricValues = document.querySelectorAll('.metric-value');
    metricValues.forEach(el => {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        if (isNaN(target)) return;

        let current = 0;
        const duration = 1200;
        const step = target / (duration / 16);
        el.textContent = '0' + suffix;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            el.textContent = Math.round(current) + suffix;
        }, 16);
    });
}

function animateProgressBars() {
    setTimeout(() => {
        document.querySelectorAll('.progress-fill[data-width]').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
        });
    }, 300);
}

// ==========================================
// EMPLOYEE TABLE
// ==========================================
function renderEmployeeTable(data) {
    const tbody = document.getElementById('employee-tbody');
    tbody.innerHTML = '';

    data.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${emp.id}</strong></td>
            <td>
                <div style="display:flex;align-items:center;gap:10px;">
                    <div class="user-avatar" style="width:32px;height:32px;font-size:11px;">${getInitials(emp.name)}</div>
                    <span>${emp.name}</span>
                </div>
            </td>
            <td>${emp.department}</td>
            <td>${emp.contact}</td>
            <td>${emp.salaryType}</td>
            <td><span class="status-badge ${emp.status === 'Active' ? 'status-active' : 'status-inactive'}">${emp.status}</span></td>
            <td>
                <div class="action-btns">
                    <button class="action-btn action-btn-edit" title="Edit" onclick="editEmployee('${emp.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="action-btn action-btn-delete" title="Delete" onclick="deleteEmployee('${emp.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('table-info').textContent = `Showing 1–${data.length} of ${data.length} employees`;
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

// Search & Filter
document.getElementById('employee-search').addEventListener('input', filterEmployees);
document.getElementById('dept-filter').addEventListener('change', filterEmployees);

function filterEmployees() {
    const search = document.getElementById('employee-search').value.toLowerCase();
    const dept = document.getElementById('dept-filter').value;

    let filtered = employees.filter(emp => {
        const matchSearch = emp.name.toLowerCase().includes(search) || emp.id.toLowerCase().includes(search);
        const matchDept = !dept || emp.department === dept;
        return matchSearch && matchDept;
    });

    renderEmployeeTable(filtered);
}

// ==========================================
// EMPLOYEE MODAL
// ==========================================
addEmployeeBtn.addEventListener('click', () => {
    modalTitle.textContent = 'Add New Employee';
    employeeForm.reset();
    document.getElementById('emp-id').value = `EMP-${String(employees.length + 1).padStart(3, '0')}`;
    openModal();
});

function openModal() {
    employeeModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    employeeModal.classList.remove('show');
    document.body.style.overflow = '';
}

modalCloseBtn.addEventListener('click', closeModal);
modalCancelBtn.addEventListener('click', closeModal);

employeeModal.addEventListener('click', (e) => {
    if (e.target === employeeModal) closeModal();
});

employeeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('emp-id').value.trim();
    const name = document.getElementById('emp-name').value.trim();
    const department = document.getElementById('emp-department').value;
    const salaryType = document.getElementById('emp-salary-type').value;
    const contact = document.getElementById('emp-contact').value.trim();
    const status = document.getElementById('emp-status').value;

    if (!id || !name || !department || !salaryType) {
        showToast('error', 'Please fill in all required fields.');
        return;
    }

    // Check if editing existing employee
    const existingIdx = employees.findIndex(emp => emp.id === id);
    if (existingIdx !== -1) {
        employees[existingIdx] = { ...employees[existingIdx], name, department, salaryType, contact, status };
        showToast('success', `Employee ${name} updated successfully.`);
    } else {
        employees.push({ id, name, department, contact, salaryType, status, salary: 0, dailyRate: 0, pieceRate: 0 });
        showToast('success', `Employee ${name} added successfully.`);
    }

    renderEmployeeTable(employees);
    closeModal();
});

// Edit Employee
window.editEmployee = function(id) {
    const emp = employees.find(e => e.id === id);
    if (!emp) return;

    modalTitle.textContent = 'Edit Employee';
    document.getElementById('emp-id').value = emp.id;
    document.getElementById('emp-name').value = emp.name;
    document.getElementById('emp-department').value = emp.department;
    document.getElementById('emp-salary-type').value = emp.salaryType;
    document.getElementById('emp-contact').value = emp.contact;
    document.getElementById('emp-status').value = emp.status;
    openModal();
};

// Delete Employee
window.deleteEmployee = function(id) {
    const emp = employees.find(e => e.id === id);
    if (!emp) return;

    if (confirm(`Are you sure you want to delete ${emp.name}?`)) {
        const idx = employees.findIndex(e => e.id === id);
        employees.splice(idx, 1);
        renderEmployeeTable(employees);
        showToast('info', `Employee ${emp.name} has been removed.`);
    }
};

// ==========================================
// ATTENDANCE
// ==========================================
function renderAttendanceTable() {
    const tbody = document.getElementById('attendance-tbody');
    tbody.innerHTML = '';

    employees.filter(e => e.status === 'Active').forEach(emp => {
        const state = attendanceState[emp.id] || null;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${emp.id}</strong></td>
            <td>
                <div style="display:flex;align-items:center;gap:10px;">
                    <div class="user-avatar" style="width:32px;height:32px;font-size:11px;">${getInitials(emp.name)}</div>
                    <span>${emp.name}</span>
                </div>
            </td>
            <td>${emp.department}</td>
            <td>
                <div class="attendance-toggle" data-emp-id="${emp.id}">
                    <button type="button" class="att-option ${state === 'present' ? 'active-present' : ''}" data-value="present">Present</button>
                    <button type="button" class="att-option ${state === 'absent' ? 'active-absent' : ''}" data-value="absent">Absent</button>
                    <button type="button" class="att-option ${state === 'halfday' ? 'active-halfday' : ''}" data-value="halfday">Half-day</button>
                </div>
            </td>
            <td>
                <input type="text" class="att-note-input" placeholder="Add note..." data-emp-id="${emp.id}">
            </td>
        `;
        tbody.appendChild(row);
    });

    // Bind toggle events
    document.querySelectorAll('.attendance-toggle').forEach(toggle => {
        toggle.querySelectorAll('.att-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const empId = toggle.dataset.empId;
                const value = btn.dataset.value;

                // Toggle: if already active, deactivate
                if (attendanceState[empId] === value) {
                    attendanceState[empId] = null;
                } else {
                    attendanceState[empId] = value;
                }

                // Update UI
                toggle.querySelectorAll('.att-option').forEach(b => {
                    b.classList.remove('active-present', 'active-absent', 'active-halfday');
                });

                if (attendanceState[empId]) {
                    btn.classList.add(`active-${attendanceState[empId]}`);
                }

                updateAttendanceStats();
            });
        });
    });

    updateAttendanceStats();
}

function updateAttendanceStats() {
    const activeEmps = employees.filter(e => e.status === 'Active');
    const present = Object.values(attendanceState).filter(v => v === 'present').length;
    const absent = Object.values(attendanceState).filter(v => v === 'absent').length;
    const halfday = Object.values(attendanceState).filter(v => v === 'halfday').length;
    const unmarked = activeEmps.length - present - absent - halfday;

    document.getElementById('att-present-count').textContent = present;
    document.getElementById('att-absent-count').textContent = absent;
    document.getElementById('att-halfday-count').textContent = halfday;
    document.getElementById('att-unmarked-count').textContent = unmarked;
}

saveAttendanceBtn.addEventListener('click', () => {
    const marked = Object.values(attendanceState).filter(v => v !== null).length;
    if (marked === 0) {
        showToast('error', 'Please mark attendance for at least one employee.');
        return;
    }
    showToast('success', `Attendance saved successfully for ${marked} employees.`);
});

// ==========================================
// PAYROLL
// ==========================================
function renderPayrollTable(data) {
    const tbody = document.getElementById('payroll-tbody');
    tbody.innerHTML = '';

    data.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${emp.id}</strong></td>
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td><span class="status-badge" style="background:${getPayTypeBg(emp.payType)};color:${getPayTypeColor(emp.payType)}">${emp.payType}</span></td>
            <td>${emp.workingDays}</td>
            <td>₹${emp.gross.toLocaleString('en-IN')}</td>
            <td style="color:var(--color-danger);">₹${emp.deductions.toLocaleString('en-IN')}</td>
            <td><strong>₹${emp.net.toLocaleString('en-IN')}</strong></td>
            <td>
                <button class="btn btn-outline btn-sm" onclick="generateSalarySlip('${emp.id}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><path d="M6 9l6 6 6-6"/></svg>
                    Slip
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function getPayTypeBg(type) {
    switch (type) {
        case 'Fixed': return 'var(--color-info-bg)';
        case 'Daily Wage': return 'var(--color-warning-bg)';
        case 'Piece-Based': return 'var(--color-success-bg)';
        default: return 'var(--color-gray-100)';
    }
}

function getPayTypeColor(type) {
    switch (type) {
        case 'Fixed': return 'var(--color-primary-dark)';
        case 'Daily Wage': return '#b54708';
        case 'Piece-Based': return '#067647';
        default: return 'var(--color-gray-600)';
    }
}

// Filter payroll by type
document.getElementById('payroll-type-filter').addEventListener('change', function () {
    const type = this.value;
    const filtered = type ? payrollData.filter(p => p.payType === type) : payrollData;
    renderPayrollTable(filtered);
});

window.generateSalarySlip = function(id) {
    const emp = payrollData.find(e => e.id === id);
    if (!emp) return;

    const slipContent = `
========================================
     DIAMOND EMPLOYEE MANAGEMENT SYSTEM
            SALARY SLIP
========================================

Employee ID:    ${emp.id}
Employee Name:  ${emp.name}
Department:     ${emp.department}
Pay Type:       ${emp.payType}
Period:         June 2026

----------------------------------------
Working Days:   ${emp.workingDays}
Gross Pay:      ₹${emp.gross.toLocaleString('en-IN')}
Deductions:     ₹${emp.deductions.toLocaleString('en-IN')}
----------------------------------------
NET PAY:        ₹${emp.net.toLocaleString('en-IN')}
========================================

Generated on: ${new Date().toLocaleDateString('en-IN')}
    `;

    // Create a printable window
    const printWindow = window.open('', '_blank', 'width=500,height=600');
    printWindow.document.write(`
        <html>
        <head>
            <title>Salary Slip - ${emp.name}</title>
            <style>
                body { font-family: 'Courier New', monospace; padding: 40px; background: #fff; }
                pre { white-space: pre-wrap; font-size: 14px; line-height: 1.8; }
            </style>
        </head>
        <body>
            <pre>${slipContent}</pre>
            <script>window.print();<\/script>
        </body>
        </html>
    `);
    printWindow.document.close();

    showToast('success', `Salary slip generated for ${emp.name}.`);
};

exportPayrollBtn.addEventListener('click', () => {
    showToast('info', 'Payroll data export initiated. Download will begin shortly.');
});

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(type, message) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
        success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'
    };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.closest('.toast').remove()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
    `;

    toastContainer.appendChild(toast);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ==========================================
// INITIALIZATION
// ==========================================
function init() {
    renderEmployeeTable(employees);
    renderAttendanceTable();
    renderPayrollTable(payrollData);

    // Set some initial attendance for demo
    attendanceState['EMP-001'] = 'present';
    attendanceState['EMP-002'] = 'present';
    attendanceState['EMP-003'] = 'present';
    attendanceState['EMP-005'] = 'present';
    attendanceState['EMP-006'] = 'present';
    attendanceState['EMP-007'] = 'halfday';
    attendanceState['EMP-009'] = 'absent';
    attendanceState['EMP-010'] = 'present';
    attendanceState['EMP-011'] = 'present';
    attendanceState['EMP-012'] = 'present';

    // Re-render attendance to reflect initial state
    renderAttendanceTable();
}

// Keyboard shortcut: Escape to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Run initialization
init();
