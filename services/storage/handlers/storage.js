const fs = require('fs');
const strings = require('../../../pkg/strings');

const storeFile = async (req, res) => {
    console.log(req.files);
    console.log(req.body);

    // let public = false;
    // if(req.body.public && req.body.public === 'true') {
    //     public = true;
    // }

    let public = req.body.public && req.body.public === 'true' ? true : false;

    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/pjpeg'
    ];

    if (!allowedTypes.includes(req.files.document.mimetype)) {
        return res.status(400).send('Bad Request');
    }

    const allowedSize = 10 * 1024 * 1024;

    if (allowedSize < req.files.document.size) {
        return res.status(400).send('Bad Request: File Too Large');
    }

    let dir = public ? 'public' : req.user.uid;

    // check if user directory exists, if not create
    
    // let userDir = `${__dirname}/../uploads/${req.user.uid}`;
    let userDir = `${__dirname}/../uploads/${dir}`;
    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
    }
    let fileName = `${strings.makeID(8)}_${req.files.document.name.replace(/ /g, '_')}`;
    let filePath = `${userDir}/${fileName}`;
    try {
        await req.files.document.mv(filePath);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }

    res.status(201).send({
        filename: fileName
    });
};

const getFile = (req, res) => {
    let userDir = `${__dirname}/../uploads/${req.user.uid}`;
    let fileName = req.params.fid;
    let filePath = `${userDir}/${fileName}`;

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File Not Found');
    }

    res.download(filePath);
    // res.status(200).send('ok');
};

const storePublicFile = async (req, res) => {
    console.log(req.files);

    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/pjpeg'
    ];

    if (!allowedTypes.includes(req.files.document.mimetype)) {
        return res.status(400).send('Bad Request');
    }

    const allowedSize = 10 * 1024 * 1024;

    if (allowedSize < req.files.document.size) {
        return res.status(400).send('Bad Request: File Too Large');
    }

    // check if user directory exists, if not create
    let userDir = `${__dirname}/../uploads/public`;
    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
    }
    let fileName = `${strings.makeID(8)}_${req.files.document.name.replace(/ /g, '_')}`;
    let filePath = `${userDir}/${fileName}`;
    try {
        await req.files.document.mv(filePath);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }

    res.status(201).send({
        filename: fileName
    });
};

const getPublicFile = (req, res) => {
    let userDir = `${__dirname}/../uploads/public`;
    let fileName = req.params.fid;
    let filePath = `${userDir}/${fileName}`;

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File Not Found');
    }

    res.download(filePath);
};

module.exports = {
    storeFile,
    getFile,
    storePublicFile,
    getPublicFile
};