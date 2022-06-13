import mongoose from 'mongoose'
  
const teamSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
	 links: {
		github: String,
		instagram: String,
		twitter: String,
		facebook: String
	}
});

const Teams = mongoose.model('Team', teamSchema);

export default Teams
