import data_admins from '../../../local-storage-data/admins.json';
import data_course_registration from '../../../local-storage-data/course-registration.json';
import data_courses from '../../../local-storage-data/courses.json';
import data_students from '../../../local-storage-data/students.json';
import data_tickets from '../../../local-storage-data/tickets.json';

export const DATASETS = [
    {name: "admins", data: data_admins},
    {name: "course-registration", data: data_course_registration},
    {name: "courses", data: data_courses},
    {name: "students", data: data_students},
    {name: "tickets", data: data_tickets}
];
