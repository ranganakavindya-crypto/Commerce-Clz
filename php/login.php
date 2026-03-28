<?php
session_start();
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mobile = trim($_POST['mobile']);
    $password = $_POST['password'];
    
    // Sanitize input
    $mobile = $conn->real_escape_string($mobile);
    
    // Query database
    $sql = "SELECT id, student_name, password_hash, academic_year 
            FROM students 
            WHERE mobile = '$mobile' AND status = 'active'";
    $result = $conn->query($sql);
    
    if ($result->num_rows == 1) {
        $student = $result->fetch_assoc();
        
        // Verify password (use password_verify() with hashed passwords)
        if (password_verify($password, $student['password_hash'])) {
            // Set session variables
            $_SESSION['student_id'] = $student['id'];
            $_SESSION['student_name'] = $student['student_name'];
            $_SESSION['academic_year'] = $student['academic_year'];
            
            // Redirect to dashboard
            header("Location: ../dashboard.html");
            exit();
        } else {
            $error = "Invalid password";
        }
    } else {
        $error = "No account found with this mobile number";
    }
    
    // Redirect back with error
    header("Location: ../login.html?error=" . urlencode($error));
    exit();
}
?>