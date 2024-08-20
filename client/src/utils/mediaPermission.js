export const requestMediaPermissions = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    console.log("Microphone and camera permissions granted.");
    return { granted: true, stream };
  } catch (error) {
    console.error("Permission denied or error:", error);
    return { granted: false, error: error.message };
  }
};

export const releaseMediaPermissions = async () => {
  const mediaDevices = navigator.mediaDevices.enumerateDevices();
  mediaDevices.then(devices => {
    devices.forEach(device => {
      if (device.kind === "videoinput" || device.kind === "audioinput") {
        navigator.mediaDevices.getUserMedia({
          [device.kind]: true
        }).then(stream => {
          let tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        });
      }
    });
  }).catch(error => {
    console.error("Error releasing media permissions:", error);
  });
};