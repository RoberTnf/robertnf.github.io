import BasePost from "@/app/components/base_post";
import Link from "next/link";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const metadata = {
    title: "Vibes and Bevy",
    publishedAt: new Date("2024-10-16"),
    updatedAt: new Date("2024-10-16"),
    categories: ["gamedev", "bch", "rust", "godot", "bevy"],
};

export default function BulletChessHeavenInBevy() {
    return <BasePost title={metadata.title}>
        This is a continuation of my <Link href="/blog/posts/0001-what-is-bullet-chess-heaven">previous post</Link> about my Bullet Chess Heaven game,
        and how I am rewriting it in Rust using the Bevy ECS framework.

        <h2>The good</h2>
        <p className="">
            I&apos;ve been working with Bevy for a while now, and it&apos;s been a positive experience!
            The ECS (Entity Component System) approach is starting to click.
            The separation of data (components) and behavior (systems) makes logical sense and promotes cleaner, more modular code.
        </p>
        <h2>The bad</h2>
        <p>
            I made it to the point where I had enemy pawns spawning and they could attack or be attacked by the player, but by then
            I had to restart from scratch a second time due to scheduling complexities.
            It&apos;s easy for systems to become interdependent and execution order dependent. Here is a hilariously bad example of what I am talking about:
        </p>

        <SyntaxHighlighter language="rust" style={darcula}>
            {`impl Plugin for UpdatePlugin {
    fn build(&self, app: &mut App) {
        app
            // Systems that run in all game states
            .add_systems(
                FixedUpdate,
                (
                    transforms::animate_transforms,
                    animation::animate_pulse_scale,
                ),
            )
            // Systems that run during active gameplay
            .add_systems(
                Update,
                (
                    // Board management
                    board_map::register_new_movement_blockers.after(pieces::enemies::spawn_enemies),
                    board_map::remove_dead_entities,
                    // Position updates and highlighting
                    highlight::highlight_player_movable_positions
                        .run_if(on_event::<RefreshCacheEvent>())
                        .after(update_position::update_position),
                    // Transform updates
                    transforms::update_transforms
                        .after(highlight::highlight_player_movable_positions),
                    // Player input (only during player's turn)
                    (player_movement::mouse_input, click_tile::tile_clicked)
                        .chain()
                        .run_if(in_state(TurnState::Player)),
                    // Spawn enmies (environment turn)
                    pieces::enemies::spawn_enemies.run_if(in_state(TurnState::Environment)),
                    // Enemy movement (only during enemy's turn)
                    movement::enemy_movement.run_if(in_state(TurnState::Enemy)),
                    // Position update (after player input and enemy movement)
                    update_position::update_position
                        .after(click_tile::tile_clicked)
                        .after(movement::enemy_movement),
                    // Attack system
                    attack::attack_system
                        .after(click_tile::tile_clicked)
                        .after(movement::enemy_movement),
                    // Pawn promotion
                    pawn::promote_pawn.after(update_position::update_position),
                    // Health systems
                    health::animate_health_change,
                    health::health_change_text_animation,
                    // death systems
                    health::death_system.after(update_position::update_position),
                    health::death_animation,
                )
                    .run_if(in_state(GameState::Game))
                    .run_if(in_state(GamePauseState::Play)),
            );
    }
}
`}
        </SyntaxHighlighter>
        <p>
            Can you make sense of it? I sure can&apos;t. Can you tell me why <i>sometimes</i> the game crashes with an error about a missing piece in the cache?
            I sure can&apos;t, I still haven&apos;t figured it out!
        </p>
        <p>
            To address this,
            I began anew with a focus on keeping systems small and independent and compiling them into plugins whenever possible.
            When specifying execution order became necessary, I ensured it was for a well-defined reason.
        </p>
        <p>
            Debugging presents another challenge. While Rust debugging is generally straightforward (I use VSCode with the CodeLLDB extension),
            sometimes variables are unavailable during debugging sessions, likely due to compiler optimizations.
            Additionally, in contrast to traditional paradigms where the call stack aids in understanding function execution order,
            ECS debugging only provides information about the current system, which can be limiting.
        </p>
        <p>
            Ultimately, these aren&apos;t insurmountable problems, but rather aspects of ECS development that require adaptation.
            Writing code in an ECS paradigm demands a different mental model, which I&apos;m still in the process of acquiring.
        </p>

        <h2>The beautiful</h2>
        <p>
            I have managed to set up a nice CI/CD pipeline on github actions, where the game is automatically compiled to different platforms:
            <ul className="my-2">
                <li className="caret">Windows</li>
                <li className="caret">Linux</li>
                <li className="caret">MacOS</li>
                <li className="caret">Wasm</li>
            </ul>
            And they are available to download <a href="https://github.com/RoberTnf/bullet_chess_heaven_rs/releases">here</a>.
        </p>
        <p>
            On top of that, the wasm version of the game is hosted on github pages and then made available in this blog through an iframe,
            play it <Link href="/projects/bullet_chess_heaven/play">here!</Link>. However, as of 2024-10-16 it is just a
            chessboard with a fancy king that can move to any square on click. It doesn&apos;t even work for touch events (it will, though).
        </p>

    </BasePost >;
}
