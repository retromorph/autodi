import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

export function Or(
  decorators: PropertyDecorator[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "Or",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [decorators],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments): boolean {
          const valid = false;
          decorators.forEach(
            (decorator) => valid && decorator(object, propertyName),
          );
          return valid;
        },
      },
    });
  };
}
