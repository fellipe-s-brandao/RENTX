import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repoistories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repoistories/SpecificationsRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepositoy';
import { CarsRepository } from '@modules/cars/infra/typeorm/repoistories/CarsRepository';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repoistories/CarsImagesRepository';

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)

container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImagesRepository
)