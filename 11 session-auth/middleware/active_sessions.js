const active_sessions = async (req, res, next) => {
  // Check if sessions are enabled
  if (req.session) {
    // Access the session data
    const sessions = Object.values(req.sessionStore.sessions).map((session) => {
      return JSON.parse(session);
    });

    console.log(`Active sessions: ${JSON.stringify(sessions)}`);
  } else {
    // Sessions are not enabled or not properly configured
    console.error("Sessions not available.");
  }

  next();
};

export default active_sessions;
