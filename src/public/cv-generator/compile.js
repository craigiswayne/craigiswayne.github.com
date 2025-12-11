import fs from 'fs';
import pug from 'pug';

// TODO: schema for this data
// TODO: contact phone needs to be in this regex format
// TODO: latest role description
// TODO: location is optional, add a description that it will read from your latest work_experience
// TODO: remove ats-cv on prototype
// TODO: favicon on the generated html
// TODO: skills to be associated to experience and then a total combined list of skills
// TODO: tools section
// https://resumeworded.com/assets/images/resume-guides/software-product-manager.png
const file_contents = fs.readFileSync('./src/public/data.json', 'utf-8');
console.log('file_data', file_contents);
const raw_data = JSON.parse(file_contents);

const data = {
    ...{
        latest_role: raw_data.work_experience.length > 0 ? raw_data.work_experience[0].job_title : (raw_data.latest_role || 'Unknown Latest Role'),
        // Determine the location from your latest work experience, however if you have specified a location
        location: raw_data.work_experience.length > 0 ? raw_data.work_experience[0].location : (raw_data.location || 'Unknown Location'),
    },
    ...raw_data,
}
const html = pug.renderFile('./src/public/cv-generator/template.pug', data);

fs.writeFileSync('./src/public/cv-generator/CV-CraigWayneGovender.html', html);
