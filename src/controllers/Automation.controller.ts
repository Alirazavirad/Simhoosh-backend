import  {AutomationModel}  from "../models/AutoMation.model";
const createAutomation = async (req: any, res: any) => {
    const { greenhouse, climate_company, status,climate_start, climate_end, climate_api, feeding_company, feeding_start, feeding_end, feeding_api } = req.body;
    try {
        const automation = await AutomationModel.create({
            greenhouse,
            climate_company,
            climate_start,
            climate_end,
            climate_api,
            status,
            feeding_company,
            feeding_start,
            feeding_end,
            feeding_api,
        });
        res.status(200).json(automation);
    } catch (error) {
        res.status(500).json({ message: "خطا در ارسال اطلاعات تماس با مشکل رخ داد" });
    }
};

const getAllAutomation = async (req: any, res: any) => {
    try {
        const automation = await AutomationModel.find().populate("greenhouse climate_company feeding_company");
        res.status(200).json(automation);
    } catch (error) {
        
        res.status(500).json({ message: "خطا در ارسال اطلاعات تماس با مشکل رخ داد" });
    }
};

const getOneAutomation = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const automation = await AutomationModel.findById(id);
        res.status(200).json(automation);
    } catch (error) {
        res.status(500).json({ message: "خطا در ارسال اطلاعات تماس با مشکل رخ داد" });
    }
};

const updateAutomation = async (req: any, res: any) => {
    const { id } = req.params;    
    const { greenhouse, climate_company,status ,climate_start, climate_end, climate_api, feeding_company, feeding_start, feeding_end, feeding_api } = req.body;
    try {
        const automation = await AutomationModel.findByIdAndUpdate(id, {
            greenhouse,
            climate_company,
            climate_start,
            climate_end,
            climate_api,
            feeding_company,
            feeding_start,
            feeding_end,
            status,
            feeding_api,
        });
        res.status(200).json(automation);
    } catch (error) {
        res.status(500).json({ message: "خطا در ارسال اطلاعات تماس با مشکل رخ داد" });
    }
};

const removeAutomation = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const automation = await AutomationModel.findByIdAndDelete(id);
        res.status(200).json(automation);
    } catch (error) {
        res.status(500).json({ message: "خطا در ارسال اطلاعات تماس با مشکل رخ داد" });
    }
};

export default {
    createAutomation,
    getAllAutomation,
    getOneAutomation,
    updateAutomation,
    removeAutomation,
};