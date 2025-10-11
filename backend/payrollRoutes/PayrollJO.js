const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

// MYSQL CONNECTION
const db = mysql.createPool({
  host: 'localhost',
  user: 'HRIST',
  password: '123',
  database: 'earist_hris',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Audit logging
function logAudit(
  user,
  action,
  tableName,
  recordId,
  targetEmployeeNumber = null
) {
  const auditQuery = `
    INSERT INTO audit_log (employeeNumber, action, table_name, record_id, targetEmployeeNumber, timestamp)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;

  db.query(
    auditQuery,
    [user.employeeNumber, action, tableName, recordId, targetEmployeeNumber],
    (err) => {
      if (err) console.error('Error inserting audit log:', err);
    }
  );
}

// =========================
// CRUD ROUTES
// =========================

// GET all JO payroll records with item_table and department joins
router.get('/payroll-jo', authenticateToken, (req, res) => {
  const sql = `
  SELECT 
    p.id,
    p.employeeNumber,
    CONCAT_WS(', ', pt.lastName, CONCAT_WS(' ', pt.firstName, pt.middleName, pt.nameExtension)) AS name, 
    p.startDate,
    p.endDate,
    p.h,
    p.m,
    p.rh,
    p.rm,
    p.rs,
    p.grossSalary,
    p.netSalary,
    p.dateCreated,
    p.status,
    itt.item_description AS position,
    da.code AS department,
    da.name AS departmentName,
    sgt.sg_number,
    CASE itt.step
      WHEN 'step1' THEN sgt.step1
      WHEN 'step2' THEN sgt.step2
      WHEN 'step3' THEN sgt.step3
      WHEN 'step4' THEN sgt.step4
      WHEN 'step5' THEN sgt.step5
      WHEN 'step6' THEN sgt.step6
      WHEN 'step7' THEN sgt.step7
      WHEN 'step8' THEN sgt.step8
      ELSE NULL
    END AS ratePerDay,
    oar.overallRenderedOfficialTime,
    oar.overallRenderedOfficialTimeTardiness AS hms,
    COALESCE(rt.sss, '0') AS sssContribution
  FROM payroll_processing p
  LEFT JOIN person_table pt ON pt.agencyEmployeeNum = p.employeeNumber
  LEFT JOIN (
    SELECT employeeID, item_description, salary_grade, step, effectivityDate,
           MAX(id) as max_id
    FROM item_table
    GROUP BY employeeID
  ) itt_max ON p.employeeNumber = itt_max.employeeID
  LEFT JOIN item_table itt ON itt.employeeID = p.employeeNumber 
    AND itt.id = itt_max.max_id
  LEFT JOIN salary_grade_table sgt ON sgt.sg_number = itt.salary_grade 
    AND sgt.effectivityDate = itt.effectivityDate
  LEFT JOIN (
    SELECT employeeNumber, code, name, MAX(id) as max_id
    FROM department_assignment
    GROUP BY employeeNumber
  ) da_max ON p.employeeNumber = da_max.employeeNumber
  LEFT JOIN department_assignment da ON da.employeeNumber = p.employeeNumber 
    AND da.id = da_max.max_id
  LEFT JOIN overall_attendance_record oar 
    ON oar.personID = p.employeeNumber 
    AND oar.startDate = p.startDate 
    AND oar.endDate = p.endDate
  LEFT JOIN remittance_table rt 
    ON CAST(rt.employeeNumber AS UNSIGNED) = p.employeeNumber
  WHERE p.rh IS NOT NULL AND p.rh != ""
  ORDER BY p.dateCreated DESC
`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching JO payroll records:', err);
      return res.status(500).json({ message: 'Error fetching records' });
    }

    logAudit(req.user, 'View', 'payroll_processing_jo', null, null);
    res.json(result);
  });
});

// GET specific JO payroll record by ID
router.get('/payroll-jo/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const sql = `
  SELECT 
    p.id,
    p.employeeNumber,
    CONCAT_WS(', ', pt.lastName, CONCAT_WS(' ', pt.firstName, pt.middleName, pt.nameExtension)) AS name, 
    p.startDate,
    p.endDate,
    p.h,
    p.m,
    p.rh,
    p.rm,
    p.rs,
    p.grossSalary,
    p.netSalary,
    p.dateCreated,
    p.status,
    itt.item_description AS position,

    da.code AS department,
    da.name AS departmentName,
    sgt.sg_number,
    CASE itt.step
      WHEN 'step1' THEN sgt.step1
      WHEN 'step2' THEN sgt.step2
      WHEN 'step3' THEN sgt.step3
      WHEN 'step4' THEN sgt.step4
      WHEN 'step5' THEN sgt.step5
      WHEN 'step6' THEN sgt.step6
      WHEN 'step7' THEN sgt.step7
      WHEN 'step8' THEN sgt.step8
      ELSE NULL
    END AS ratePerDay,
    oar.overallRenderedOfficialTime,
    oar.overallRenderedOfficialTimeTardiness AS hms
  FROM payroll_processing p
  LEFT JOIN person_table pt ON pt.agencyEmployeeNum = p.employeeNumber
  LEFT JOIN (
    SELECT employeeID, item_description, salary_grade, step, effectivityDate,
           MAX(id) as max_id
    FROM item_table
    GROUP BY employeeID
  ) itt_max ON p.employeeNumber = itt_max.employeeID
  LEFT JOIN item_table itt ON itt.employeeID = p.employeeNumber 
    AND itt.id = itt_max.max_id
  LEFT JOIN salary_grade_table sgt ON sgt.sg_number = itt.salary_grade 
    AND sgt.effectivityDate = itt.effectivityDate
  LEFT JOIN (
    SELECT employeeNumber, code, name, MAX(id) as max_id
    FROM department_assignment
    GROUP BY employeeNumber
  ) da_max ON p.employeeNumber = da_max.employeeNumber
  LEFT JOIN department_assignment da ON da.employeeNumber = p.employeeNumber 
    AND da.id = da_max.max_id
  LEFT JOIN overall_attendance_record oar 
    ON oar.personID = p.employeeNumber 
    AND oar.startDate = p.startDate 
    AND oar.endDate = p.endDate
  WHERE p.id = ? 
    AND p.rh IS NOT NULL AND p.rh != ""
`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching JO payroll record:', err);
      return res.status(500).json({ message: 'Error fetching record' });
    }
    if (result.length === 0)
      return res.status(404).json({ message: 'Payroll record not found' });

    logAudit(
      req.user,
      'View',
      'payroll_processing_jo',
      id,
      result[0].employeeNumber
    );
    res.json(result[0]);
  });
});

// SEARCH JO payroll records
router.get('/payroll-jo/search', authenticateToken, (req, res) => {
  const { searchTerm } = req.query;

  const sql = `
  SELECT 
    p.id,
    p.employeeNumber,
    CONCAT_WS(', ', pt.lastName, CONCAT_WS(' ', pt.firstName, pt.middleName, pt.nameExtension)) AS name, 
    p.startDate,
    p.endDate,
    p.h,
    p.m,
    p.rh,
    p.rm,
    p.rs,
    p.grossSalary,
    p.netSalary,
    p.dateCreated,
    itt.item_description AS position,
    da.code AS department,
    da.name AS departmentName,
    sgt.sg_number,
    CASE itt.step
      WHEN 'step1' THEN sgt.step1
      WHEN 'step2' THEN sgt.step2
      WHEN 'step3' THEN sgt.step3
      WHEN 'step4' THEN sgt.step4
      WHEN 'step5' THEN sgt.step5
      WHEN 'step6' THEN sgt.step6
      WHEN 'step7' THEN sgt.step7
      WHEN 'step8' THEN sgt.step8
      ELSE NULL
    END AS ratePerDay,
    oar.overallRenderedOfficialTime,
    oar.overallRenderedOfficialTimeTardiness AS hms
  FROM payroll_processing p
  LEFT JOIN person_table pt ON pt.agencyEmployeeNum = p.employeeNumber
  LEFT JOIN (
    SELECT employeeID, item_description, salary_grade, step, effectivityDate,
           MAX(id) as max_id
    FROM item_table
    GROUP BY employeeID
  ) itt_max ON p.employeeNumber = itt_max.employeeID
  LEFT JOIN item_table itt ON itt.employeeID = p.employeeNumber 
    AND itt.id = itt_max.max_id
  LEFT JOIN salary_grade_table sgt ON sgt.sg_number = itt.salary_grade 
    AND sgt.effectivityDate = itt.effectivityDate
  LEFT JOIN (
    SELECT employeeNumber, code, name, MAX(id) as max_id
    FROM department_assignment
    GROUP BY employeeNumber
  ) da_max ON p.employeeNumber = da_max.employeeNumber
  LEFT JOIN department_assignment da ON da.employeeNumber = p.employeeNumber 
    AND da.id = da_max.max_id
  LEFT JOIN overall_attendance_record oar 
    ON oar.personID = p.employeeNumber 
    AND oar.startDate = p.startDate 
    AND oar.endDate = p.endDate
  WHERE p.rh IS NOT NULL AND p.rh != ""
    AND (p.employeeNumber LIKE ? OR pt.lastName LIKE ? OR pt.firstName LIKE ?)
  ORDER BY p.dateCreated DESC
`;

  const searchPattern = `%${searchTerm}%`;

  db.query(
    sql,
    [searchPattern, searchPattern, searchPattern],
    (err, result) => {
      if (err) {
        console.error('Error searching JO payroll records:', err);
        return res.status(500).json({ message: 'Error searching records' });
      }

      logAudit(req.user, 'Search', 'payroll_processing_jo', null, searchTerm);
      res.json(result);
    }
  );
});

// CREATE JO payroll record
// CREATE JO payroll record
router.post('/payroll-jo', authenticateToken, async (req, res) => {
  const {
    employeeNumber,
    startDate,
    endDate,
    h,
    m,
    s,
    rh,
    rm,
    rs,
    department,
  } = req.body;

  try {
    // ✅ VALIDATION: Check if rh exists and is greater than 0
    if (!rh || rh === 0 || rh === '0' || rh === null || rh === '') {
      return res.status(400).json({
        error:
          'Rendered hours (rh) is required and must be greater than 0 for Payroll JO submission.',
        employeeNumber: employeeNumber,
      });
    }

    const checkQuery = `
      SELECT id FROM payroll_processing 
      WHERE employeeNumber = ? AND startDate = ? AND endDate = ?
      LIMIT 1
    `;

    const [existing] = await db
      .promise()
      .query(checkQuery, [employeeNumber, startDate, endDate]);

    if (existing.length > 0) {
      console.log(
        `Duplicate JO payroll found - skipping employee ${employeeNumber} for period ${startDate} to ${endDate}`
      );
      return res.status(409).json({
        error: 'Payroll record already exists for this employee and period.',
      });
    }

    const insertSql = `
      INSERT INTO payroll_processing 
        (employeeNumber, name, startDate, endDate, h, m, s, rh, rm, rs, department, status, dateCreated)
      SELECT 
        ?,  
        CONCAT_WS(', ', pt.lastName, CONCAT_WS(' ', pt.firstName, pt.middleName, pt.nameExtension)) AS name,
        ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW()
      FROM person_table pt
      WHERE pt.agencyEmployeeNum = ?;
    `;

    const [result] = await db.promise().query(insertSql, [
      employeeNumber,
      startDate,
      endDate,
      h || 0,
      m || 0,
      s || 0,
      rh, // Now validated above
      rm || null,
      rs || null,
      department || null,
      employeeNumber,
    ]);

    logAudit(
      req.user,
      'insert',
      'Payroll Processing (JO)',
      result.insertId,
      employeeNumber
    );

    res.status(201).json({
      message: 'JO payroll record added successfully',
      id: result.insertId,
    });
  } catch (err) {
    console.error('Error adding JO payroll record:', err);
    res.status(500).json({ message: 'Error adding payroll record' });
  }
});

// UPDATE JO payroll record
router.put('/payroll-jo/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const {
    employeeNumber,
    name,
    startDate,
    endDate,
    h,
    m,
    s,
    rh,
    rm,
    rs,
    grossSalary,
    netSalary,
  } = req.body;

  const sql = `
    UPDATE payroll_processing
    SET employeeNumber = ?, name = ?, startDate = ?, endDate = ?, 
        h = ?, m = ?, s = ?, rh = ?, rm = ?, rs = ?,
        grossSalary = ?, netSalary = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      employeeNumber,
      name,
      startDate,
      endDate,
      h,
      m,
      s,
      rh,
      rm,
      rs,
      grossSalary,
      netSalary,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error('Error updating JO payroll record:', err);
        return res
          .status(500)
          .json({ message: 'Error updating payroll record' });
      }
      if (result.affectedRows === 0)
        return res.status(404).json({ message: 'Payroll record not found' });

      logAudit(req.user, 'Update', 'payroll_processing_jo', id, employeeNumber);
      res.json({ message: 'JO payroll record updated successfully' });
    }
  );
});

// DELETE JO payroll record
router.delete('/payroll-jo/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM payroll_processing WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting JO payroll record:', err);
      return res.status(500).json({ message: 'Error deleting payroll record' });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Payroll record not found' });

    logAudit(req.user, 'Delete', 'payroll_processing_jo', id, null);
    res.json({ message: 'JO payroll record deleted successfully' });
  });
});
// GET official time schedule with time ranges
// GET official time schedule with smart day formatting
router.get('/official-time/:employeeNumber', authenticateToken, (req, res) => {
  const { employeeNumber } = req.params;

  const sql = `
    SELECT 
      day,
      officialTimeIN,
      officialTimeOUT
    FROM officialtime
    WHERE employeeID = ?
      AND officialTimeIN IS NOT NULL 
      AND officialTimeIN != '00:00:00 AM' 
      AND officialTimeIN != ''
      AND officialTimeOUT IS NOT NULL 
      AND officialTimeOUT != '00:00:00 PM'
      AND officialTimeOUT != ''
    ORDER BY 
      FIELD(day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
  `;

  db.query(sql, [employeeNumber], (err, result) => {
    if (err) {
      console.error('Error fetching official time:', err);
      return res.status(500).json({ message: 'Error fetching official time' });
    }

    if (result.length === 0) {
      return res.json({
        days: [],
        daysCovered: '—',
        numberOfDays: 0,
        timeRange: '—',
      });
    }

    const days = result.map((row) => row.day);
    const dayAbbreviations = {
      Monday: 'M',
      Tuesday: 'T',
      Wednesday: 'W',
      Thursday: 'Th',
      Friday: 'F',
      Saturday: 'S',
      Sunday: 'Su',
    };

    const dayOrder = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    // Function to format days intelligently
    function formatDaysCovered(days) {
      if (days.length === 0) return '—';
      if (days.length === 1) return dayAbbreviations[days[0]];

      // Map days to their indices
      const dayIndices = days.map((day) => dayOrder.indexOf(day));

      // Check if days are consecutive
      let isConsecutive = true;
      for (let i = 1; i < dayIndices.length; i++) {
        if (dayIndices[i] !== dayIndices[i - 1] + 1) {
          isConsecutive = false;
          break;
        }
      }

      if (isConsecutive) {
        // Format as range: "M-F"
        return `${dayAbbreviations[days[0]]}-${
          dayAbbreviations[days[days.length - 1]]
        }`;
      } else {
        // Format as comma-separated: "M, T, W, F"
        return days.map((day) => dayAbbreviations[day]).join(', ');
      }
    }

    const daysCovered = formatDaysCovered(days);

    // Get the time range from the first record (assuming all have same times)
    const timeIN = result[0].officialTimeIN;
    const timeOUT = result[0].officialTimeOUT;
    const timeRange = `${timeIN} - ${timeOUT}`;

    res.json({
      days: days,
      daysCovered: daysCovered,
      numberOfDays: days.length,
      timeRange: timeRange,
      officialTimeIN: timeIN,
      officialTimeOUT: timeOUT,
    });
  });
});

router.post('/export-to-finalized', authenticateToken, async (req, res) => {
  const payrollData = req.body;

  if (!Array.isArray(payrollData) || payrollData.length === 0) {
    return res.status(400).json({ error: 'No payroll data provided' });
  }

  const insertQuery = `
    INSERT INTO finalize_payroll (
      employeeNumber, department, startDate, endDate, name, position,
      grossSalary, h, m, s, netSalary, sss, rh, abs
    ) VALUES ?
  `;

  // Map array of records for bulk insert
  const values = payrollData.map((row) => [
    row.employeeNumber || null,
    row.department || null,
    row.startDate || null,
    row.endDate || null,
    row.name || '',
    row.position || '',
    row.grossAmount || 0,
    row.h || 0,
    row.m || 0,
    row.s || 0,
    row.netSalary || 0,
    row.sssContribution || 0,
    row.rh || 0,
    row.abs || 0,
  ]);

  db.query(insertQuery, [values], (err, result) => {
    if (err) {
      console.error('Error exporting payroll to finalized table:', err);
      const employeeNumbers = payrollData
        .map((entry) => entry.employeeNumber)
        .join(', ');
      logAudit(
        req.user,
        'create_failed',
        'finalize_payroll',
        null,
        employeeNumbers
      );
      return res.status(500).json({ error: 'Database error during export' });
    }

    // Log successful insertion
    const employeeNumbers = payrollData
      .map((entry) => entry.employeeNumber)
      .join(', ');
    logAudit(
      req.user,
      'create',
      'finalize_payroll',
      result.insertId,
      employeeNumbers
    );

    // Update status in payroll_processing to 1 (processed)
    // Build WHERE clause to match specific records by employeeNumber, startDate, and endDate
    const updateConditions = payrollData
      .map(() => '(employeeNumber = ? AND startDate = ? AND endDate = ?)')
      .join(' OR ');

    const updateValues = payrollData.flatMap((row) => [
      row.employeeNumber,
      row.startDate,
      row.endDate,
    ]);

    const updateQuery = `
      UPDATE payroll_processing
      SET status = 1
      WHERE ${updateConditions}
    `;

    db.query(updateQuery, updateValues, (updateErr, updateResult) => {
      if (updateErr) {
        console.error(
          'Error updating status in payroll_processing:',
          updateErr
        );
        logAudit(
          req.user,
          'status_update_failed',
          'payroll_processing',
          result.insertId,
          employeeNumbers
        );
        return res
          .status(500)
          .json({ error: 'Payroll inserted, but failed to update status.' });
      }

      // Log successful status update
      logAudit(
        req.user,
        'status_update',
        'payroll_processing',
        result.insertId,
        employeeNumbers
      );

      res.json({
        message:
          'Payroll successfully exported to finalized payroll and status updated!',
        inserted: result.affectedRows,
        updated: updateResult.affectedRows,
      });
    });
  });
});

module.exports = router;
