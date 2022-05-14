// Routes
const { API_PREFIX } = require('config');

const { AuthRoutes } = require('../components/Auth/auth.module');
const { CourseRoutes } = require('../components/Course/course.module');
const { FeesRoutes } = require('../components/Fees/fees.module');
const { EnrollmentRoutes } = require('../components/Enrollment/enrollment.module');
const { StudentRoutes } = require('../components/Student/student.module');

const routes = [
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/courses',
    route: CourseRoutes
  },
  {
    path: '/fees',
    route: FeesRoutes
  },
  {
    path: '/enrollments',
    route: EnrollmentRoutes
  },
  {
    path: '/students',
    route: StudentRoutes
  }
];

module.exports = (app) => {
  routes.forEach((route) => {
    app.use(API_PREFIX + route.path, route.route);
  });
};
