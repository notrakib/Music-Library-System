Step 0: Git Clone <br />
    git@github.com:notrakib/Music-Library-System.git <br />

Step 1: Configure Database <br />
    Create database in postgresql named 'music_library' <br />

Step 2: Configure .env <br />
    Create a .env file at root project directory <br />
    Put POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_DATABASE_DEV="music_library", TOKEN_SECRET and PORT in .env file <br />

Step 3: Run the Server <br />
    At root project directory run the below command <br />
    npm run dev <br />

Step 4: Populate Database <br />
    Go to './utils/insertData' and find line 32 <br />
    Uncomment line 32 and save <br />
    Then again comment line 32 <br />
    Congratulation!! Database has been populated with some test data. <br />

API endpoints, expected request and response formats <br />
    The urls have been set up to make it self explanatory <br />
    Please check './validators' for better visualization of expected request <br />

Thank You
