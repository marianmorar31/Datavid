import Member from "../models/member.js";

import { getDaysUntilBirthday } from "../utils/dateUtils.js";

export const addMember = async (req, res) => {
  try {
    const { firstName, lastName, birthDate, country, city } = req.body;
    const birthDateObj = new Date(birthDate);
    const age = new Date().getFullYear() - birthDateObj.getFullYear();
    if (age < 18)
      return res.status(400).send("Member must be at least 18 years old");

    const member = new Member({
      firstName,
      lastName,
      birthDate: birthDateObj,
      country,
      city,
    });
    await member.save();
    res.status(201).send(member);
  } catch (error) {
    if (
      (error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.firstName &&
        error.keyPattern.lastName &&
        error.keyPattern.city) ||
      (error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.firstName &&
        error.keyPattern.city) ||
      (error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.lastName &&
        error.keyPattern.city)
    ) {
      res
        .status(400)
        .send("Member with the same name and location already exists");
    } else {
      res.status(400).send(error.message);
    }
  }
};

export const getAllMembers = async (req, res) => {
  try {
    const { searchTerm, country } = req.query;

    const query = {};
    if (searchTerm) {
      query.$or = [
        { firstName: { $regex: new RegExp(searchTerm, "i") } },
        { lastName: { $regex: new RegExp(searchTerm, "i") } },
        { country: { $regex: new RegExp(searchTerm, "i") } },
        { city: { $regex: new RegExp(searchTerm, "i") } },
      ];
    }

    let members = await Member.find(query);

    members = members.map((member) => ({
      ...member.toObject(),
      daysUntilBirthday: getDaysUntilBirthday(new Date(member.birthDate)),
    }));

    members.sort((a, b) => a.daysUntilBirthday - b.daysUntilBirthday);

    res.send(members);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getMemberById = async (req, res) => {
  try {
    const memberId = req.params.id;
    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json(member);
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, birthDate, country, city } = req.body;

    const updatedMember = await Member.findByIdAndUpdate(
      id,
      { firstName, lastName, birthDate, country, city },
      { new: true }
    );
    if (!updatedMember) {
      return res.status(404).send("Member not found");
    }

    res.send(updatedMember);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMember = await Member.findByIdAndDelete(id);
    if (!deletedMember) {
      return res.status(404).send("Member not found");
    }

    res.send("Member deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
