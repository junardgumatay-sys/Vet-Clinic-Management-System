import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../app.module';
import { User } from '../modules/users/entities/user.entity';
import { Species } from '../modules/species/entities/species.entity';
import { AppointmentStatus } from '../modules/appointment_statuses/entities/appointment_status.entity';
import { PaymentStatus } from '../modules/payment_statuses/entities/payment_status.entity';
import { PaymentMethod } from '../modules/payment_methods/entities/payment_method.entity';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    console.log('🌱 Starting database seed...');

    // 1. Seed Species (column is `name`)
    const speciesRepo = dataSource.getRepository(Species);
    const defaultSpecies = ['Dog', 'Cat', 'Bird', 'Rabbit'];
    for (const name of defaultSpecies) {
        const exists = await speciesRepo.findOneBy({ name });
        if (!exists) {
        await speciesRepo.save(speciesRepo.create({ name }));
        }
    }

    // 2. Seed Appointment Statuses
    const apptStatusRepo = dataSource.getRepository(AppointmentStatus);
    const defaultApptStatuses = ['Scheduled', 'Completed', 'Cancelled', 'No-Show'];
    for (const name of defaultApptStatuses) {
        const exists = await apptStatusRepo.findOneBy({ name });
        if (!exists) {
        await apptStatusRepo.save(apptStatusRepo.create({ name }));
        }
    }

    // 3. Seed Payment Statuses
    const payStatusRepo = dataSource.getRepository(PaymentStatus);
    const defaultPayStatuses = ['Pending', 'Paid', 'Failed', 'Refunded'];
    for (const name of defaultPayStatuses) {
        const exists = await payStatusRepo.findOneBy({ name });
        if (!exists) {
        await payStatusRepo.save(payStatusRepo.create({ name }));
        }
    }

    // 4. Seed Payment Methods
    const payMethodRepo = dataSource.getRepository(PaymentMethod);
    const defaultPayMethods = ['Cash', 'Credit Card', 'GCash', 'Bank Transfer'];
    for (const name of defaultPayMethods) {
        const exists = await payMethodRepo.findOneBy({ name });
        if (!exists) {
        await payMethodRepo.save(payMethodRepo.create({ name }));
        }
    }

    const userRepo = dataSource.getRepository(User);
    const adminEmail = 'admin@vetclinic.com';
    const existingAdmin = await userRepo.findOneBy({ email: adminEmail });

    if (!existingAdmin) {
    const password_hash = await bcrypt.hash('Admin@123', 10);
    await userRepo.save(
        userRepo.create({
            email: adminEmail,
            password_hash,
            role: 'ADMIN',
        }),
    );
    console.log('✅ Created default admin: admin@vetclinic.com / Admin@123');
    } else {
    console.log('ℹ️  Default admin already exists, skipping.');
    }

    console.log('🎉 Seeding complete!');
    await app.close();
}

bootstrap().catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});