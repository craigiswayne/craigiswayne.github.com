import fs from 'fs';
import pug from 'pug';

// TODO: remove ats-cv on prototype
// TODO: skills to be associated to experience and then a total combined list of skills
// TODO: tools section
// https://resumeworded.com/assets/images/resume-guides/software-product-manager.png
const file_contents = fs.readFileSync('./src/public/data.json', 'utf-8');
const raw_data = JSON.parse(file_contents);

const data = {
    ...{
        latest_role: raw_data.work_experience.length > 0 ? raw_data.work_experience[0].job_title : (raw_data.latest_role || 'Unknown Latest Role'),
        // Determine the location from your latest work experience, however if you have specified a location
        location: raw_data.work_experience.length > 0 ? raw_data.work_experience[0].location : (raw_data.location || 'Unknown Location'),
    },
    ...raw_data,
}
const html = pug.renderFile('./resume-generator/template.pug', data);

fs.writeFileSync('./src/public/resume/index.html', html);
