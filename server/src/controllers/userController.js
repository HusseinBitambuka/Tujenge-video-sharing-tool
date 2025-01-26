const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const UserController = {
  async register(req, res) {
    try {
      const { firstName, lastName, cohort, email, password, role } = req.body;

      // Basic validation
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All required fields must be provided' });
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        firstName,
        lastName,
        cohort,
        email,
        password: hashedPassword,
        role: role || 'student', // Default to student if role not specified
      });

      // Don't send password in response
      const { password: _, ...userWithoutPassword } = user.toJSON();
      res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to register user' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { 
          userId: user.id, 
          role: user.role,
          email: user.email 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
      );

      res.status(200).json({ 
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to login' });
    }
  },
};

module.exports = UserController;