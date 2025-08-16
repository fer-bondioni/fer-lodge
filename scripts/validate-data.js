#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🔍 Validating Fer Lodge Data Structure...\n");

// Read data files
const dataPath = path.join(__dirname, "../src/data");
const usersPath = path.join(dataPath, "users.json");
const moviesPath = path.join(dataPath, "movies.json");
const userMoviesPath = path.join(dataPath, "userMovies.json");

try {
  const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
  const movies = JSON.parse(fs.readFileSync(moviesPath, "utf8"));
  const userMovies = JSON.parse(fs.readFileSync(userMoviesPath, "utf8"));

  console.log("📊 Data Validation Results:\n");

  // Validate users
  console.log("👥 Users:");
  console.log(`  - Total users: ${users.users.length}`);
  users.users.forEach((user) => {
    console.log(`  - ${user.name}: ${user.movies.length} movies`);
  });

  // Validate movies
  console.log("\n🎬 Movies:");
  console.log(`  - Total movies: ${movies.movies.length}`);
  const userMoviesCount = movies.movies.filter((m) => m.isUserMovie).length;
  const extraMoviesCount = movies.movies.filter((m) => !m.isUserMovie).length;
  console.log(`  - User movies: ${userMoviesCount}`);
  console.log(`  - Extra movies: ${extraMoviesCount}`);

  // Validate user movies
  console.log("\n🎯 User Movie Assignments:");
  Object.entries(userMovies.userMovies).forEach(([userName, userMovieList]) => {
    console.log(`  - ${userName}: ${userMovieList.length} movies`);
    userMovieList.forEach((movie) => {
      console.log(`    • ${movie.title} (${movie.year})`);
    });
  });

  // Cross-reference validation
  console.log("\n🔗 Cross-reference Validation:");
  let allValid = true;

  Object.entries(userMovies.userMovies).forEach(([userName, userMovieList]) => {
    const userFromUsers = users.users.find((u) => u.name === userName);
    if (!userFromUsers) {
      console.log(`  ❌ User ${userName} not found in users.json`);
      allValid = false;
    } else if (userFromUsers.movies.length !== userMovieList.length) {
      console.log(
        `  ❌ Movie count mismatch for ${userName}: ${userFromUsers.movies.length} vs ${userMovieList.length}`
      );
      allValid = false;
    } else {
      console.log(`  ✅ ${userName}: ${userMovieList.length} movies validated`);
    }
  });

  // Check if all user movies exist in movies.json
  const allUserMovieIds = Object.values(userMovies.userMovies)
    .flat()
    .map((m) => m.id);
  const missingMovies = allUserMovieIds.filter(
    (id) => !movies.movies.find((m) => m.id === id)
  );

  if (missingMovies.length > 0) {
    console.log(
      `  ❌ Missing movies in movies.json: ${missingMovies.join(", ")}`
    );
    allValid = false;
  } else {
    console.log("  ✅ All user movies found in movies.json");
  }

  console.log("\n" + "=".repeat(50));
  if (allValid) {
    console.log("🎉 All data validation passed! Ready for development.");
  } else {
    console.log("⚠️  Some validation issues found. Please review the data.");
  }
  console.log("=".repeat(50));
} catch (error) {
  console.error("❌ Error reading data files:", error.message);
  process.exit(1);
}
