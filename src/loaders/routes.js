// Routes
const { AuthRoutes } = require('../components/Auth/auth.module');
const { CourseRoutes } = require('../components/Course/course.module');
const { FeesRoutes } = require('../components/Fees/fees.module');
const { EnrollmentRoutes } = require('../components/Enrollment/enrollment.module');
const { StudentRoutes } = require('../components/Student/student.module');

module.exports = function getRoutes(app) {
  app.use('/api/v1/auth', AuthRoutes);
  app.use('/api/v1/courses', CourseRoutes);
  app.use('/api/v1/fees', FeesRoutes);
  app.use('/api/v1/enrollments', EnrollmentRoutes);
  app.use('/api/v1/students', StudentRoutes);
};
