import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../lib/db';
import bcrypt from 'bcryptjs';

// Define the attributes of the User model
interface UserAttributes {
    id: number;
    email: string;
    password: string;
}

// Optional attributes for creating a user
type UserCreationAttributes = Optional<UserAttributes, 'id'>;

// Extend the Model class with attributes and methods
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    comparePassword(password: string): Promise<boolean>;
}

// Define the User model
const User = sequelize.define<UserInstance>('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

// Hook to hash the password before saving
User.beforeSave(async (user) => {
    if (user.changed('password')) {
        const currentPassword = user.get('password') as string;
        user.set('password', await bcrypt.hash(currentPassword, 10));
    }
});

// Add a method to compare passwords
(User.prototype as UserInstance).comparePassword = async function (password: string): Promise<boolean> {
    const hashedPassword = this.get('password') as string;
    return bcrypt.compare(password, hashedPassword);
};

export default User;
