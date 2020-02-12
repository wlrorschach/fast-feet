import File from '../models/File';

class AvatarFileContoller {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({ name, path, assignature: false });

    return res.json(file);
  }
}

export default new AvatarFileContoller();
