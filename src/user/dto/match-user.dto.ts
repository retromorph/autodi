export class MatchUserDto {
  public identity: string;
  public password: string;

  public static of =
    (identity: string) =>
      (password: string): MatchUserDto => {
        return {
          identity,
          password,
        };
      };
}