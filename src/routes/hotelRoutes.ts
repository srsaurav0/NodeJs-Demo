import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { getAllHotels, getHotelById, saveOrUpdateHotel } from '../utils/dataHandler';
import { generateSlug, generateRoomSlug } from '../middleware/slugMiddleware';
import { Hotel, Room } from '../types';  // Ensure the types are correct

const router = express.Router();

router.use(express.json());

router.get('/hotels', async (_, res: Response): Promise<void> => {
    try {
        const hotels = await getAllHotels();
        res.json(hotels);
    } catch (error) {
        console.error('Error retrieving hotels:', error);
        res.status(500).send("Failed to retrieve hotels.");
    }
});

router.post('/hotel', generateSlug, async (req: Request<{}, {}, Hotel>, res: Response): Promise<void> => {
    const newHotel: Hotel = { ...req.body, id: Date.now().toString() };  // Ensure ID is unique
    try {
        await saveOrUpdateHotel(newHotel);
        res.status(201).json(newHotel);
    } catch (error) {
        console.error('Error adding hotel:', error);
        res.status(500).send("Failed to add hotel.");
    }
});

router.get('/hotel/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const hotel = await getHotelById(req.params.id);
        if (!hotel) {
            res.status(404).send("Hotel not found");
        } else {
            res.json(hotel);
        }
    } catch (error) {
        console.error('Error retrieving hotel:', error);
        res.status(500).send("Failed to retrieve hotel.");
    }
});

router.put('/hotel/:id', generateSlug, async (req: Request<{ id: string }, {}, Hotel>, res: Response): Promise<void> => {
    try {
        const existingHotel = await getHotelById(req.params.id);
        if (!existingHotel) {
            res.status(404).send("Hotel not found");
            return;
        }

        const updatedHotel = { ...existingHotel, ...req.body, id: req.params.id };
        await saveOrUpdateHotel(updatedHotel);
        res.status(200).json(updatedHotel);
    } catch (error) {
        console.error('Error updating hotel:', error);
        res.status(500).send("Failed to update hotel.");
    }
});

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../data/images'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post('/hotel/:id/images', upload.array('images', 10), async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const hotelId = req.params.id;
        const hotel = await getHotelById(hotelId);

        if (!hotel) {
            res.status(404).send('Hotel not found');
            return;
        }

        if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
            res.status(400).send('No images were uploaded.');
            return;
        }

        const uploadedFiles = (req.files as Express.Multer.File[]).map(file => `/data/images/${file.filename}`);
        hotel.images = hotel.images ? [...hotel.images, ...uploadedFiles] : uploadedFiles;
        await saveOrUpdateHotel(hotel);

        res.status(200).json({ message: 'Images uploaded successfully', images: uploadedFiles });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).send('Failed to upload images');
    }
});

// Route to add a new room to a hotel
router.post('/hotel/:id/rooms', generateRoomSlug, async (req: Request<{ id: string }, {}, Room>, res: Response): Promise<void> => {
    try {
        const hotelId = req.params.id;
        const newRoom: Room = req.body;

        const hotel = await getHotelById(hotelId);
        if (!hotel) {
            res.status(404).send('Hotel not found');
            return;
        }

        hotel.rooms = hotel.rooms ? [...hotel.rooms, newRoom] : [newRoom];
        await saveOrUpdateHotel(hotel);

        res.status(201).json({ message: 'Room added successfully', room: newRoom });
    } catch (error) {
        console.error('Error adding room:', error);
        res.status(500).send('Failed to add room.');
    }
});

export default router;
