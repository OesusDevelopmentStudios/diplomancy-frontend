enum GameMode
{
    WW1 = 0
}

export function gameModeAsText(value: GameMode): string
{
    switch (value)
    {
        case GameMode.WW1: return 'WW1';
        default: return 'Error';
    }
}
