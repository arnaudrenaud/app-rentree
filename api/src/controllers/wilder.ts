import { Request, Response } from "express";

import WilderModel from "../models/Wilder";

const createWilder = async (req: Request, res: Response) => {
  const wilder = WilderModel(req.body);
  try {
    const result = await wilder.save();
    res.json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, result: (error as Error).message });
  }
};

const deleteWilder = async (req: Request, res: Response) => {
  const { name } = req.params;
  const result = await WilderModel.deleteOne({ name });
  if (result.deletedCount === 0) {
    res.status(404).json({ success: false, result: "Wilder does not exist." });
  }
  res.json({ success: true, result });
};

const getAllWilders = async (req: Request, res: Response) => {
  const wilders = await WilderModel.find();
  res.json({ success: true, result: wilders });
};

const updateWilder = async (req: Request, res: Response) => {
  const { name } = req.params;
  const result = await WilderModel.updateOne({ name }, req.body);
  res.json({ success: true, result });
};

export { createWilder, deleteWilder, getAllWilders, updateWilder };
