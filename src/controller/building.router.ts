import express, { Request, Response } from 'express';
import BuildingService from '../service/building.service';

const router = express.Router();
const service = new BuildingService();

router.post('/buildings', async (req: Request, res: Response) => {
  return service.createBuilding(req, res);
});

router.get('/buildings', async (req: Request, res: Response) => {
  return service.getBuildings(req, res);
});

router.get('/buildings/:id', async (req: Request, res: Response) => {
  return service.getBuildingById(req, res);
});

router.put('/buildings/:id', async (req: Request, res: Response) => {
  service.updateBuilding(req, res);
});

router.delete('/buildings/:id', async (req: Request, res: Response) => {
  service.deleteBuilding(req, res);
});

router.get('/unreal/buildings', async (req: Request, res: Response) => {
  service.getUnrealBuildingsData(req, res);
});

router.get('/unreal/buildings/:fid', async (req: Request, res: Response) => {
  service.getUnrealBuildingDataByFid(req, res);
});

export default router;
