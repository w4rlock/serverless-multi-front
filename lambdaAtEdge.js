exports.handler = (event, context, callback) => {
  // Extract the request from the CloudFront event that is sent to Lambda@Edge
  const request = event.Records[0].cf.request;
  const oldUrl = request.uri;
  // remove cloud front base mapping
  let newUrl = oldUrl
    .split("/")
    .slice(2)
    .join("/");

  newUrl = `/${newUrl}`;

  if (newUrl.endsWith("/")) {
    newUrl = `${newUrl}index.html`;
  }

  // Log the URI as received by CloudFront and the new URI to be used to fetch from origin
  console.log("Old URI: " + oldUrl);
  console.log("New URI: " + newUrl);

  // Replace the received URI with the URI that includes the index page
  request.uri = newUrl;
  // Return to CloudFront
  return callback(null, request);
};