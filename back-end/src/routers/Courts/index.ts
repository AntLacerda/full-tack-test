import Router from "express";
import { courtController } from "../../controllers/Courts";
import authorization from "../../middlewares/Authorization";
import { authentication } from "../../middlewares/Authentication";

const courtsRouter = Router();
/**
 * @swagger
 * tags:
 *   name: Courts
 *   description: Courts management
 */
/**
 * @swagger
 * /api/v1/courts/save:
 *   post:
 *     summary: Create a new court
 *     tags: [Courts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               available:
 *                 type: boolean
 *             required:
 *               - name
 *               - location
 *               - available
 *     responses:
 *       201:
 *         description: Court created successfully
 *       409:
 *         description: Court already exists
 *       500:
 *         description: Internal server error
 */
courtsRouter.post("/save", authentication, authorization, courtController.createCourt);
/**
 * @swagger
 * /api/v1/courts:
 *   get:
 *     summary: Get all courts (optionally filter by availability)
 *     tags: [Courts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: available
 *         in: query
 *         description: Filter courts by availability
 *         required: false
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of courts
 *       500:
 *         description: Internal server error
 */
courtsRouter.get("/", authentication, courtController.findAllCourts);
/**
 * @swagger
 * /api/v1/courts/{id}:
 *   get:
 *     summary: Get court by ID
 *     tags: [Courts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Court ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Court data
 *       404:
 *         description: Court not found
 *       500:
 *         description: Internal server error
 */
courtsRouter.get("/:id", authentication, courtController.findById);
/**
 * @swagger
 * /api/v1/courts/{id}:
 *   put:
 *     summary: Update a court by ID
 *     tags: [Courts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Court ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               available:
 *                 type: boolean
 *             required:
 *               - name
 *               - location
 *               - available
 *     responses:
 *       200:
 *         description: Court updated successfully
 *       404:
 *         description: Court not found
 *       500:
 *         description: Internal server error
 */
courtsRouter.put("/:id", authentication, authorization, courtController.update);
/**
 * @swagger
 * /api/v1/courts/{id}/availability:
 *   patch:
 *     summary: Toggle availability of a court
 *     tags: [Courts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Court ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Court availability updated
 *       404:
 *         description: Court not found
 *       500:
 *         description: Internal server error
 */
courtsRouter.patch("/:id/availability", authentication, authorization, courtController.updateAvailability);
/**
 * @swagger
 * /api/v1/courts/{id}:
 *   delete:
 *     summary: Delete a court by ID
 *     tags: [Courts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Court ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Court deleted successfully
 *       404:
 *         description: Court not found
 *       500:
 *         description: Internal server error
 */
courtsRouter.delete("/:id", authentication, authorization, courtController.remove);

export default courtsRouter;