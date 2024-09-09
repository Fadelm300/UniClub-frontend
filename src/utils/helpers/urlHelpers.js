export function deriveChannelPath({ uni , college, major, course, event }) {
  let path = "/";
  if(uni){
    path = `/${uni}`;
  }
  if (college) {
    path = `/${uni}/${college}`;
  }

  if (major) {
    path = `/${uni}/${college}/${major}`;
  }
  if (course) {
    path = `/${uni}/${college}/${major}/${course}`;
  }
  if (event) {
    path = `/${uni}/${college}/${major}/${course}`;
  }

  return path;
}
