import toast from 'react-hot-toast';

// IMAGE UPLOAD FUNCTIONALITY
export async function upload(e, callbackFn) {
  const image = e.target.files?.[0];

  if (image) {
    const uploadPromise = new Promise((resolve, reject) => {
      const data = new FormData();

      data.set('image', image);
      fetch(`/api/uploadImage`, {
        method: 'POST',
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            response
              .json()
              .then((link) => {
                // console.log(link);
                callbackFn(link);
                resolve(link); // we send back this link to our promise function so we can destructure this link when we call our function from anywhere
              })
              .catch((err) => console.log(err));
          } else {
            reject();
          }
        })
        .catch((error) => console.log(error));
    });

    await toast.promise(uploadPromise, {
      loading: 'Uploading...',
      success: 'Uploaded!',
      error: 'Upload error',
    });
  }
}
