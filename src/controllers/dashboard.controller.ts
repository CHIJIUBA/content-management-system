import express, { Request, Response } from 'express';
import User from '../db/models/user.model';

class DashBoardController {
  public async dashBoardView(req: Request, res: Response): Promise<any> {
    try {
      const user = await User.findOne({ where: { id: req.body.userId } });
      return res.json({
        message: 'Welcome to the protected dashboard!',
        user,
      });
    } catch (error) {
      console.log(`Error in dashboard view method auth controller:${error}`);
    }
  }

  public createPost(req: Request, res: Response) {
    const title = req.body.title;
    const content = req.body.content;
    try {
      res.status(200).send({
        message: 'Post created successfully',
      });
    } catch (error) {
      console.log(`Error in dashboard view method auth controller:${error}`);
    }
  }
}

const dashController = new DashBoardController();
export default dashController;
