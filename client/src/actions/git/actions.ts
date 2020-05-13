import { FETCH_REPO, REPO_RESPONSE, RESET_REPO } from './constants';
import axios from 'axios';

// helper function to parse the input of the repo from the user into something more readable
const splitRepoFromString = (repo: string) => {
  if (repo.indexOf('/')) {
    const split = repo.split('/').slice(0, 2);
    return {
      user: split[0],
      project: split[1],
    };
  }
  return { user: null, project: null };
};

// action that takes a repo name, and fetches the information on the repository from the backend
export const fetchRepo = (repo: string) => (dispatch: any) => {
  dispatch({ type: FETCH_REPO, payload: repo });
  const { user, project } = splitRepoFromString(repo);
  axios
    .get(`/api/${user}/${project}/info`)
    .then((res) => {
      const { data = [] } = res;
      dispatch({ type: REPO_RESPONSE, payload: data });
    })
    .catch((err) => {
      // TODO: dispatch the error state and handle appropriately
      dispatch({ type: RESET_REPO });
      console.error('error encountered', err);
    });

  // dispatch({
  //   type: REPO_RESPONSE,
  //   payload: [
  //     {
  //       name: '.travis.yml',
  //       content:
  //         'bGFuZ3VhZ2U6IGdvCgpnbzoKICAtIDEuNC4zCiAgLSAxLjUuMwogIC0gdGlw\nCgpzY3JpcHQ6CiAgLSBnbyB0ZXN0IC12IC4vLi4uCg==\n',
  //       type: 'file',
  //       message: '',
  //     },
  //     {
  //       name: 'CONTRIBUTING.md',
  //       content:
  //         'IyBIb3cgdG8gY29udHJpYnV0ZQoKV2UgZGVmaW5pdGVseSB3ZWxjb21lIHBh\ndGNoZXMgYW5kIGNvbnRyaWJ1dGlvbiB0byB0aGlzIHByb2plY3QhCgojIyMg\nTGVnYWwgcmVxdWlyZW1lbnRzCgpJbiBvcmRlciB0byBwcm90ZWN0IGJvdGgg\neW91IGFuZCBvdXJzZWx2ZXMsIHlvdSB3aWxsIG5lZWQgdG8gc2lnbiB0aGUK\nW0NvbnRyaWJ1dG9yIExpY2Vuc2UgQWdyZWVtZW50XShodHRwczovL2NsYS5k\nZXZlbG9wZXJzLmdvb2dsZS5jb20vY2xhcykuCgpZb3UgbWF5IGhhdmUgYWxy\nZWFkeSBzaWduZWQgaXQgZm9yIG90aGVyIEdvb2dsZSBwcm9qZWN0cy4K\n',
  //       type: 'file',
  //       message: '',
  //     },
  //     {
  //       name: 'CONTRIBUTORS',
  //       content:
  //         'UGF1bCBCb3JtYW4gPGJvcm1hbkBnb29nbGUuY29tPgpibWF0c3VvCnNoYXdu\ncHMKdGhlb3J5Cmpib3ZlcmZlbHQKZHN5bW9uZHMKY2QxCndhbGxjbG9ja2J1\naWxkZXIKZGFuc291emEK\n',
  //       type: 'file',
  //       message: '',
  //     },
  //     {
  //       name: 'LICENSE',
  //       content:
  //         'Q29weXJpZ2h0IChjKSAyMDA5LDIwMTQgR29vZ2xlIEluYy4gQWxsIHJpZ2h0\ncyByZXNlcnZlZC4KClJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNl\nIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dAptb2RpZmljYXRp\nb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5n\nIGNvbmRpdGlvbnMgYXJlCm1ldDoKCiAgICogUmVkaXN0cmlidXRpb25zIG9m\nIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQK\nbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxv\nd2luZyBkaXNjbGFpbWVyLgogICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5h\ncnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUKY29weXJpZ2h0IG5v\ndGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dp\nbmcgZGlzY2xhaW1lcgppbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3Ro\nZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlCmRpc3RyaWJ1dGlvbi4K\nICAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIEdvb2dsZSBJbmMuIG5vciB0aGUg\nbmFtZXMgb2YgaXRzCmNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRv\ncnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tCnRoaXMgc29m\ndHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Np\nb24uCgpUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklH\nSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTCiJBUyBJUyIgQU5EIEFOWSBF\nWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQg\nTk9UCkxJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVS\nQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUgpBIFBBUlRJQ1VMQVIgUFVS\nUE9TRSBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENP\nUFlSSUdIVApPV05FUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBB\nTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwKU1BFQ0lBTCwgRVhF\nTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywg\nQlVUIE5PVApMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRF\nIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwKREFUQSwgT1IgUFJP\nRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNF\nRCBBTkQgT04gQU5ZClRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4g\nQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQKKElOQ0xVRElO\nRyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZ\nIE9VVCBPRiBUSEUgVVNFCk9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURW\nSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuCg==\n',
  //       type: 'file',
  //       message: '',
  //     },
  //     {
  //       name: 'README.md',
  //       content:
  //         'IyB1dWlkICFbYnVpbGQgc3RhdHVzXShodHRwczovL3RyYXZpcy1jaS5vcmcv\nZ29vZ2xlL3V1aWQuc3ZnP2JyYW5jaD1tYXN0ZXIpClRoZSB1dWlkIHBhY2th\nZ2UgZ2VuZXJhdGVzIGFuZCBpbnNwZWN0cyBVVUlEcyBiYXNlZCBvbgpbUkZD\nIDQxMjJdKGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzQxMjIpCmFu\nZCBEQ0UgMS4xOiBBdXRoZW50aWNhdGlvbiBhbmQgU2VjdXJpdHkgU2Vydmlj\nZXMuIAoKVGhpcyBwYWNrYWdlIGlzIGJhc2VkIG9uIHRoZSBnaXRodWIuY29t\nL3Bib3JtYW4vdXVpZCBwYWNrYWdlIChwcmV2aW91c2x5IG5hbWVkCmNvZGUu\nZ29vZ2xlLmNvbS9wL2dvLXV1aWQpLiAgSXQgZGlmZmVycyBmcm9tIHRoZXNl\nIGVhcmxpZXIgcGFja2FnZXMgaW4gdGhhdAphIFVVSUQgaXMgYSAxNiBieXRl\nIGFycmF5IHJhdGhlciB0aGFuIGEgYnl0ZSBzbGljZS4gIE9uZSBsb3NzIGR1\nZSB0byB0aGlzCmNoYW5nZSBpcyB0aGUgYWJpbGl0eSB0byByZXByZXNlbnQg\nYW4gaW52YWxpZCBVVUlEICh2cyBhIE5JTCBVVUlEKS4KCiMjIyMjIyBJbnN0\nYWxsCmBnbyBnZXQgZ2l0aHViLmNvbS9nb29nbGUvdXVpZGAKCiMjIyMjIyBE\nb2N1bWVudGF0aW9uIApbIVtHb0RvY10oaHR0cHM6Ly9nb2RvYy5vcmcvZ2l0\naHViLmNvbS9nb29nbGUvdXVpZD9zdGF0dXMuc3ZnKV0oaHR0cDovL2dvZG9j\nLm9yZy9naXRodWIuY29tL2dvb2dsZS91dWlkKQoKRnVsbCBgZ28gZG9jYCBz\ndHlsZSBkb2N1bWVudGF0aW9uIGZvciB0aGUgcGFja2FnZSBjYW4gYmUgdmll\nd2VkIG9ubGluZSB3aXRob3V0Cmluc3RhbGxpbmcgdGhpcyBwYWNrYWdlIGJ5\nIHVzaW5nIHRoZSBHb0RvYyBzaXRlIGhlcmU6IApodHRwOi8vcGtnLmdvLmRl\ndi9naXRodWIuY29tL2dvb2dsZS91dWlkCg==\n',
  //       type: 'file',
  //       message: '',
  //     },
  //     {
  //       name: 'dce.go',
  //       content:
  //         'Ly8gQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gIEFsbCByaWdodHMgcmVz\nZXJ2ZWQuCi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVk\nIGJ5IGEgQlNELXN0eWxlCi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQg\naW4gdGhlIExJQ0VOU0UgZmlsZS4KCnBhY2thZ2UgdXVpZAoKaW1wb3J0ICgK\nCSJlbmNvZGluZy9iaW5hcnkiCgkiZm10IgoJIm9zIgopCgovLyBBIERvbWFp\nbiByZXByZXNlbnRzIGEgVmVyc2lvbiAyIGRvbWFpbgp0eXBlIERvbWFpbiBi\neXRlCgovLyBEb21haW4gY29uc3RhbnRzIGZvciBEQ0UgU2VjdXJpdHkgKFZl\ncnNpb24gMikgVVVJRHMuCmNvbnN0ICgKCVBlcnNvbiA9IERvbWFpbigwKQoJ\nR3JvdXAgID0gRG9tYWluKDEpCglPcmcgICAgPSBEb21haW4oMikKKQoKLy8g\nTmV3RENFU2VjdXJpdHkgcmV0dXJucyBhIERDRSBTZWN1cml0eSAoVmVyc2lv\nbiAyKSBVVUlELgovLwovLyBUaGUgZG9tYWluIHNob3VsZCBiZSBvbmUgb2Yg\nUGVyc29uLCBHcm91cCBvciBPcmcuCi8vIE9uIGEgUE9TSVggc3lzdGVtIHRo\nZSBpZCBzaG91bGQgYmUgdGhlIHVzZXJzIFVJRCBmb3IgdGhlIFBlcnNvbgov\nLyBkb21haW4gYW5kIHRoZSB1c2VycyBHSUQgZm9yIHRoZSBHcm91cC4gIFRo\nZSBtZWFuaW5nIG9mIGlkIGZvcgovLyB0aGUgZG9tYWluIE9yZyBvciBvbiBu\nb24tUE9TSVggc3lzdGVtcyBpcyBzaXRlIGRlZmluZWQuCi8vCi8vIEZvciBh\nIGdpdmVuIGRvbWFpbi9pZCBwYWlyIHRoZSBzYW1lIHRva2VuIG1heSBiZSBy\nZXR1cm5lZCBmb3IgdXAgdG8KLy8gNyBtaW51dGVzIGFuZCAxMCBzZWNvbmRz\nLgpmdW5jIE5ld0RDRVNlY3VyaXR5KGRvbWFpbiBEb21haW4sIGlkIHVpbnQz\nMikgKFVVSUQsIGVycm9yKSB7Cgl1dWlkLCBlcnIgOj0gTmV3VVVJRCgpCglp\nZiBlcnIgPT0gbmlsIHsKCQl1dWlkWzZdID0gKHV1aWRbNl0gJiAweDBmKSB8\nIDB4MjAgLy8gVmVyc2lvbiAyCgkJdXVpZFs5XSA9IGJ5dGUoZG9tYWluKQoJ\nCWJpbmFyeS5CaWdFbmRpYW4uUHV0VWludDMyKHV1aWRbMDpdLCBpZCkKCX0K\nCXJldHVybiB1dWlkLCBlcnIKfQoKLy8gTmV3RENFUGVyc29uIHJldHVybnMg\nYSBEQ0UgU2VjdXJpdHkgKFZlcnNpb24gMikgVVVJRCBpbiB0aGUgcGVyc29u\nCi8vIGRvbWFpbiB3aXRoIHRoZSBpZCByZXR1cm5lZCBieSBvcy5HZXR1aWQu\nCi8vCi8vICBOZXdEQ0VTZWN1cml0eShQZXJzb24sIHVpbnQzMihvcy5HZXR1\naWQoKSkpCmZ1bmMgTmV3RENFUGVyc29uKCkgKFVVSUQsIGVycm9yKSB7Cgly\nZXR1cm4gTmV3RENFU2VjdXJpdHkoUGVyc29uLCB1aW50MzIob3MuR2V0dWlk\nKCkpKQp9CgovLyBOZXdEQ0VHcm91cCByZXR1cm5zIGEgRENFIFNlY3VyaXR5\nIChWZXJzaW9uIDIpIFVVSUQgaW4gdGhlIGdyb3VwCi8vIGRvbWFpbiB3aXRo\nIHRoZSBpZCByZXR1cm5lZCBieSBvcy5HZXRnaWQuCi8vCi8vICBOZXdEQ0VT\nZWN1cml0eShHcm91cCwgdWludDMyKG9zLkdldGdpZCgpKSkKZnVuYyBOZXdE\nQ0VHcm91cCgpIChVVUlELCBlcnJvcikgewoJcmV0dXJuIE5ld0RDRVNlY3Vy\naXR5KEdyb3VwLCB1aW50MzIob3MuR2V0Z2lkKCkpKQp9CgovLyBEb21haW4g\ncmV0dXJucyB0aGUgZG9tYWluIGZvciBhIFZlcnNpb24gMiBVVUlELiAgRG9t\nYWlucyBhcmUgb25seSBkZWZpbmVkCi8vIGZvciBWZXJzaW9uIDIgVVVJRHMu\nCmZ1bmMgKHV1aWQgVVVJRCkgRG9tYWluKCkgRG9tYWluIHsKCXJldHVybiBE\nb21haW4odXVpZFs5XSkKfQoKLy8gSUQgcmV0dXJucyB0aGUgaWQgZm9yIGEg\nVmVyc2lvbiAyIFVVSUQuIElEcyBhcmUgb25seSBkZWZpbmVkIGZvciBWZXJz\naW9uIDIKLy8gVVVJRHMuCmZ1bmMgKHV1aWQgVVVJRCkgSUQoKSB1aW50MzIg\newoJcmV0dXJuIGJpbmFyeS5CaWdFbmRpYW4uVWludDMyKHV1aWRbMDo0XSkK\nfQoKZnVuYyAoZCBEb21haW4pIFN0cmluZygpIHN0cmluZyB7Cglzd2l0Y2gg\nZCB7CgljYXNlIFBlcnNvbjoKCQlyZXR1cm4gIlBlcnNvbiIKCWNhc2UgR3Jv\ndXA6CgkJcmV0dXJuICJHcm91cCIKCWNhc2UgT3JnOgoJCXJldHVybiAiT3Jn\nIgoJfQoJcmV0dXJuIGZtdC5TcHJpbnRmKCJEb21haW4lZCIsIGludChkKSkK\nfQo=\n',
  //       type: 'file',
  //       message: '',
  //     },
  //     {
  //       name: 'doc.go',
  //       content:
  //         'Ly8gQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gIEFsbCByaWdodHMgcmVz\nZXJ2ZWQuCi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVk\nIGJ5IGEgQlNELXN0eWxlCi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQg\naW4gdGhlIExJQ0VOU0UgZmlsZS4KCi8vIFBhY2thZ2UgdXVpZCBnZW5lcmF0\nZXMgYW5kIGluc3BlY3RzIFVVSURzLgovLwovLyBVVUlEcyBhcmUgYmFzZWQg\nb24gUkZDIDQxMjIgYW5kIERDRSAxLjE6IEF1dGhlbnRpY2F0aW9uIGFuZCBT\nZWN1cml0eQovLyBTZXJ2aWNlcy4KLy8KLy8gQSBVVUlEIGlzIGEgMTYgYnl0\nZSAoMTI4IGJpdCkgYXJyYXkuICBVVUlEcyBtYXkgYmUgdXNlZCBhcyBrZXlz\nIHRvCi8vIG1hcHMgb3IgY29tcGFyZWQgZGlyZWN0bHkuCnBhY2thZ2UgdXVp\nZAo=\n',
  //       type: 'file',
  //       message: '',
  //     },
  //     {
  //       name: 'go.mod',
  //       content: 'bW9kdWxlIGdpdGh1Yi5jb20vZ29vZ2xlL3V1aWQK\n',
  //       type: 'file',
  //       message: '',
  //     },
  //     {
  //       name: 'hash.go',
  //       content:
  //         'Ly8gQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gIEFsbCByaWdodHMgcmVz\nZXJ2ZWQuCi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVk\nIGJ5IGEgQlNELXN0eWxlCi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQg\naW4gdGhlIExJQ0VOU0UgZmlsZS4KCnBhY2thZ2UgdXVpZAoKaW1wb3J0ICgK\nCSJjcnlwdG8vbWQ1IgoJImNyeXB0by9zaGExIgoJImhhc2giCikKCi8vIFdl\nbGwga25vd24gbmFtZXNwYWNlIElEcyBhbmQgVVVJRHMKdmFyICgKCU5hbWVT\ncGFjZUROUyAgPSBNdXN0KFBhcnNlKCI2YmE3YjgxMC05ZGFkLTExZDEtODBi\nNC0wMGMwNGZkNDMwYzgiKSkKCU5hbWVTcGFjZVVSTCAgPSBNdXN0KFBhcnNl\nKCI2YmE3YjgxMS05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgiKSkKCU5h\nbWVTcGFjZU9JRCAgPSBNdXN0KFBhcnNlKCI2YmE3YjgxMi05ZGFkLTExZDEt\nODBiNC0wMGMwNGZkNDMwYzgiKSkKCU5hbWVTcGFjZVg1MDAgPSBNdXN0KFBh\ncnNlKCI2YmE3YjgxNC05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgiKSkK\nCU5pbCAgICAgICAgICAgVVVJRCAvLyBlbXB0eSBVVUlELCBhbGwgemVyb3MK\nKQoKLy8gTmV3SGFzaCByZXR1cm5zIGEgbmV3IFVVSUQgZGVyaXZlZCBmcm9t\nIHRoZSBoYXNoIG9mIHNwYWNlIGNvbmNhdGVuYXRlZCB3aXRoCi8vIGRhdGEg\nZ2VuZXJhdGVkIGJ5IGguICBUaGUgaGFzaCBzaG91bGQgYmUgYXQgbGVhc3Qg\nMTYgYnl0ZSBpbiBsZW5ndGguICBUaGUKLy8gZmlyc3QgMTYgYnl0ZXMgb2Yg\ndGhlIGhhc2ggYXJlIHVzZWQgdG8gZm9ybSB0aGUgVVVJRC4gIFRoZSB2ZXJz\naW9uIG9mIHRoZQovLyBVVUlEIHdpbGwgYmUgdGhlIGxvd2VyIDQgYml0cyBv\nZiB2ZXJzaW9uLiAgTmV3SGFzaCBpcyB1c2VkIHRvIGltcGxlbWVudAovLyBO\nZXdNRDUgYW5kIE5ld1NIQTEuCmZ1bmMgTmV3SGFzaChoIGhhc2guSGFzaCwg\nc3BhY2UgVVVJRCwgZGF0YSBbXWJ5dGUsIHZlcnNpb24gaW50KSBVVUlEIHsK\nCWguUmVzZXQoKQoJaC5Xcml0ZShzcGFjZVs6XSkKCWguV3JpdGUoZGF0YSkK\nCXMgOj0gaC5TdW0obmlsKQoJdmFyIHV1aWQgVVVJRAoJY29weSh1dWlkWzpd\nLCBzKQoJdXVpZFs2XSA9ICh1dWlkWzZdICYgMHgwZikgfCB1aW50OCgodmVy\nc2lvbiYweGYpPDw0KQoJdXVpZFs4XSA9ICh1dWlkWzhdICYgMHgzZikgfCAw\neDgwIC8vIFJGQyA0MTIyIHZhcmlhbnQKCXJldHVybiB1dWlkCn0KCi8vIE5l\nd01ENSByZXR1cm5zIGEgbmV3IE1ENSAoVmVyc2lvbiAzKSBVVUlEIGJhc2Vk\nIG9uIHRoZQovLyBzdXBwbGllZCBuYW1lIHNwYWNlIGFuZCBkYXRhLiAgSXQg\naXMgdGhlIHNhbWUgYXMgY2FsbGluZzoKLy8KLy8gIE5ld0hhc2gobWQ1Lk5l\ndygpLCBzcGFjZSwgZGF0YSwgMykKZnVuYyBOZXdNRDUoc3BhY2UgVVVJRCwg\nZGF0YSBbXWJ5dGUpIFVVSUQgewoJcmV0dXJuIE5ld0hhc2gobWQ1Lk5ldygp\nLCBzcGFjZSwgZGF0YSwgMykKfQoKLy8gTmV3U0hBMSByZXR1cm5zIGEgbmV3\nIFNIQTEgKFZlcnNpb24gNSkgVVVJRCBiYXNlZCBvbiB0aGUKLy8gc3VwcGxp\nZWQgbmFtZSBzcGFjZSBhbmQgZGF0YS4gIEl0IGlzIHRoZSBzYW1lIGFzIGNh\nbGxpbmc6Ci8vCi8vICBOZXdIYXNoKHNoYTEuTmV3KCksIHNwYWNlLCBkYXRh\nLCA1KQpmdW5jIE5ld1NIQTEoc3BhY2UgVVVJRCwgZGF0YSBbXWJ5dGUpIFVV\nSUQgewoJcmV0dXJuIE5ld0hhc2goc2hhMS5OZXcoKSwgc3BhY2UsIGRhdGEs\nIDUpCn0K\n',
  //       type: 'file',
  //       message: '',
  //     },
  //   ],
  // });
};
