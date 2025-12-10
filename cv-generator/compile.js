import fs from 'fs';
import pug from 'pug';

// TODO: read data from external file
// TODO: schema for this data
// TODO: contact phone needs to be in this regex format
// TODO: latest role description
// TODO: location is optional, add a description that it will read from your latest work_experience
// TODO: remove ats-cv on prototype
// TODO: favicon on the generated html
// TODO: skills to be associated to experience and then a total combined list of skills
// TODO: tools section
// https://resumeworded.com/assets/images/resume-guides/software-product-manager.png
const raw_data = {
    "first_names": "Craig Wayne",
    "last_name": "Govender",
    "latest_role": "Senior Frontend Developer",
    "location": "Douglas, Isle of Man",
    "summary": "Senior Full Stack JavaScript Engineer with 10+ years of experience in TypeScript, Angular, React, Next.js, and Node.js. Proven technical leadership in architecting scalable cloud solutions (AWS/Azure) and high-traffic systems (payment gateways, WebGL games). Dedicated to clean code, performance, and translating business goals into robust software.",
    "contact": {
        "email": "craigiswayne@gmail.com",
        "linkedin_username": "craigiswayne",
        "phone": "+447624401629"
    },
    "work_experience": [
        {
            "position": "Senior Frontend Developer",
            "organization": "UROC Studios",
            "location": {
                "city": "Douglas",
                "country": "Isle of Man"
            },
            "period": {
                "start": "Nov 2024",
                "end": "Present"
            },
            "responsibilities": [
                "Design and Develop Slot, Scratch and Crash Games",
                "Maintain and Deploy our various games",
                "Work closely with the design and qa team to ensure that the games are according to spec",
                "Develop and maintain unit tests",
                "Automation wrt deployments, builds, testing",
                "Build custom in house tools to facilitate with development of our games",
                "Maintenance and development of the corporate website"
            ]
        },
        {
            "position": "Senior Frontend Developer",
            "organization": "Microgaming",
            "location": {
                "city": "Douglas",
                "country": "Isle of Man"
            },
            "period": {
                "start": "Oct 2022",
                "end": "Nov 2024"
            },
            "responsibilities": [
                "Creating and maintaining in-house solutions to improve business processes",
                "2IC to the Tech Lead. Providing insights into architecting several micro-services to improve performance, delivery and disaster recovery",
                "Mentoring of juniors in tech and business acumen.",
                "Service Desk Support",
                "Desktop Support",
                "Software Installation for Games Global Employees",
                "Maintaining Power Automate Workflows",
                "Maintenance of Customer Facing Applications",
                "Studio Website Development and Maintenance",
                "Project Management"
            ]
        },
        {
            "position": "Senior Frontend Developer",
            "organization": "Rank Interactive",
            "location": {
                "city": "Cape Town",
                "country": "South Africa"
            },
            "period": {
                "start": "Sep 2020",
                "end": " Aug 2022"
            },
            "responsibilities": [
                "Development and maintenance of the in-house cashier services on several Casinos and Bingo operators in the UK.",
                "Responsible for capturing Player Card Details and integrating with payment systems such as VISA, PayPal and Barclays.",
                "Our cashier systems also handle promoting bonuses and promotions to the player which they could redeem through the app",
                "Our cashier app is built to withstand large amounts of traffic whilst implementing UI and UX best practices. On any given day, it handles approximately 80,000 transactions",
                "Maintaining unit tests coupled with continuous integration pipelines"
            ]
        },
        {
            "position": "Intermediate Web Developer",
            "organization": "Digioutsource",
            "location": {
                "city": "Cape Town",
                "country": "South Africa"
            },
            "period": {
                "start": "Feb 2019",
                "end": " Aug 2020"
            },
            "responsibilities": [
                "Updating and maintaining an in house CMS that serves a multinational casino base.",
                "Mentoring colleagues and trainees on the business landscape as well as current best practices within our industry.",
                "Rotational After hours support and Tech assistance.",
                "2IC to the Team Lead and responsible for mentoring the junior / intermediate colleagues.",
                "The CI/CD process leverages GitLabs Pipelines integrating tightly with Kubernetes",
            ]
        },
    ],
    "education": [
        {
            "degree_level": "Bachelor's",
            "discipline": "Commerce",
            "majors": "Information Systems",
            "institution_name": "University of KwaZulu-Natal",
            "location": {
                "province": "KwaZulu-Natal",
                "country": "South Africa"
            },
            "period": {
                "start": "Jan 2008",
                "end": "Dec 2012"
            },
        }
    ],
    "skills": [
        "SQL",
        "Javascript",
        "Typescript",
        "React",
        "Angular",
        "Laravel",
        "Full Stack Web Development",
        "WebGL Slot Game Development",
        "Website Development",
        "Agile Development",
        "Scrum",
        "System Design & Architecture",
        "SEO",
        "E-Commerce",
        "Load testing",
        "Vue",
        "ThreeJS",
        "PixiJS",
        "NodeJS",
        "HTML5",
        "SAAS",
        "CSS",
        ".Net Core",
        "PHP",
        "WordPress",
        "Bash",
        "Shell Script",
        "Git",
        "Nginx",
        "IIS",
        "Apache",
        "Docker",
        "Mongo",
        "MYSQL",
        "Microsoft SQL Server",
        "REST",
        "Figma",
        "Miro",
    ]
}

const data = {
    ...{
        latest_role: raw_data.work_experience.length > 0 ? raw_data.work_experience[0].job_title : (raw_data.latest_role || 'Unknown Latest Role'),
        // Determine the location from your latest work experience, however if you have specified a location
        location: raw_data.work_experience.length > 0 ? raw_data.work_experience[0].location : (raw_data.location || 'Unknown Location'),
    },
    ...raw_data,
}
const html = pug.renderFile('./cv-generator/template.pug', data);

fs.writeFileSync('./cv-generator/CV-CraigWayneGovender.html', html);
