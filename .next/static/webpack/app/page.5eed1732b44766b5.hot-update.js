"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./store/image.tsx":
/*!*************************!*\
  !*** ./store/image.tsx ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useImage: function() { return /* binding */ useImage; }\n/* harmony export */ });\n/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand */ \"(app-pages-browser)/./node_modules/zustand/esm/index.mjs\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _components_FileReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/FileReader */ \"(app-pages-browser)/./components/FileReader.ts\");\n\n\n\n// Define a set of colors\nconst colors = [\n    \"#FF5733\",\n    \"#33FF57\",\n    \"#3357FF\",\n    \"#FF33A1\",\n    \"#A133FF\",\n    \"#33FFA1\",\n    \"#FF5733\",\n    \"#33FF57\",\n    \"#3357FF\"\n];\nconst jsonApi = {\n    method: \"POST\",\n    url: \"https://detect.roboflow.com/tooth-disease/1?api_key=tAIdURDipgqWJHApslZW&format=json\",\n    headers: {\n        \"Content-Type\": \"application/json\"\n    },\n    data: \"\"\n};\nconst imageApi = {\n    method: \"POST\",\n    url: \"https://detect.roboflow.com/tooth-disease/1?api_key=tAIdURDipgqWJHApslZW&format=image&stroke=3&labels=on\",\n    headers: {\n        \"Content-Type\": \"application/json\"\n    },\n    responseType: \"arraybuffer\",\n    data: \"\"\n};\nconst useImage = (0,zustand__WEBPACK_IMPORTED_MODULE_1__.create)((set)=>({\n        image: null,\n        chartData: {\n            classes: [],\n            confidences: [],\n            colors: []\n        },\n        explanations: {},\n        loading: false,\n        notImageUrl: false,\n        fetchImage: async (url)=>{\n            set({\n                loading: true\n            });\n            const jsonApiUrl = jsonApi.url + \"&image=\".concat(encodeURIComponent(url));\n            const imageApiUrl = imageApi.url + \"&image=\".concat(encodeURIComponent(url));\n            try {\n                const jsonResponse = await (0,axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n                    ...jsonApi,\n                    url: jsonApiUrl\n                });\n                const jsonResponseData = jsonResponse.data;\n                // handle the image response\n                const imageResponse = await (0,axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n                    ...imageApi,\n                    url: imageApiUrl\n                });\n                const blob = new Blob([\n                    imageResponse.data\n                ], {\n                    type: \"image/jpeg\"\n                });\n                const imagePath = URL.createObjectURL(blob);\n                const classes = jsonResponseData.predictions.map((pred)=>pred.class);\n                const confidences = jsonResponseData.predictions.map((pred)=>pred.confidence);\n                const colorsAssigned = jsonResponseData.predictions.map((_, index)=>colors[index % colors.length] // Assign a color from the predefined set\n                );\n                set({\n                    image: imagePath,\n                    chartData: {\n                        classes,\n                        confidences,\n                        colors: colorsAssigned\n                    },\n                    loading: false,\n                    notImageUrl: false\n                });\n            } catch (error) {\n                set({\n                    loading: false,\n                    notImageUrl: true\n                });\n            }\n        },\n        fetchImageFile: async (file)=>{\n            set({\n                loading: true\n            });\n            const base64Image = await (0,_components_FileReader__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(file);\n            const jsonApiData = {\n                ...jsonApi,\n                data: JSON.stringify(base64Image)\n            };\n            const imageApiData = {\n                ...imageApi,\n                data: JSON.stringify(base64Image)\n            };\n            try {\n                const jsonResponse = await (0,axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(jsonApiData);\n                const jsonResponseData = jsonResponse.data;\n                const imageResponse = await (0,axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(imageApiData);\n                const blob = new Blob([\n                    imageResponse.data\n                ], {\n                    type: \"image/jpeg\"\n                });\n                const imagePath = URL.createObjectURL(blob);\n                const classes = jsonResponseData.predictions.map((pred)=>pred.class);\n                const confidences = jsonResponseData.predictions.map((pred)=>pred.confidence);\n                const colorsAssigned = jsonResponseData.predictions.map((_, index)=>colors[index % colors.length] // Assign a color from the predefined set\n                );\n                set({\n                    image: imagePath,\n                    chartData: {\n                        classes,\n                        confidences,\n                        colors: colorsAssigned\n                    },\n                    loading: false,\n                    notImageUrl: false\n                });\n            } catch (error) {\n                set({\n                    loading: false,\n                    notImageUrl: false\n                });\n            }\n        },\n        fetchExplanation: async (disease)=>{\n            try {\n                const response = await axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/api/explain\", {\n                    disease\n                });\n                const explanation = response.data.content;\n                set((state)=>({\n                        explanations: {\n                            ...state.explanations,\n                            [disease]: explanation\n                        }\n                    }));\n            } catch (error) {\n                console.error(\"Error fetching explanation:\", error);\n            }\n        }\n    }));\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ly9fTl9FLy4vc3RvcmUvaW1hZ2UudHN4PzIyMjgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSBcInp1c3RhbmRcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCBnZXRCYXNlNjRGcm9tRmlsZSBmcm9tIFwiQC9jb21wb25lbnRzL0ZpbGVSZWFkZXJcIjtcblxuLy8gRGVmaW5lIGEgc2V0IG9mIGNvbG9yc1xuY29uc3QgY29sb3JzID0gW1xuICBcIiNGRjU3MzNcIixcbiAgXCIjMzNGRjU3XCIsXG4gIFwiIzMzNTdGRlwiLFxuICBcIiNGRjMzQTFcIixcbiAgXCIjQTEzM0ZGXCIsXG4gIFwiIzMzRkZBMVwiLFxuICBcIiNGRjU3MzNcIixcbiAgXCIjMzNGRjU3XCIsXG4gIFwiIzMzNTdGRlwiLFxuXTtcblxuaW50ZXJmYWNlIEltYWdlIHtcbiAgaW1hZ2U6IGFueTtcbiAgY2hhcnREYXRhOiB7XG4gICAgY2xhc3Nlczogc3RyaW5nW107XG4gICAgY29uZmlkZW5jZXM6IG51bWJlcltdO1xuICAgIGNvbG9yczogc3RyaW5nW107XG4gIH07XG4gIGV4cGxhbmF0aW9uczogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgbG9hZGluZzogYm9vbGVhbjtcbiAgbm90SW1hZ2VVcmw6IGJvb2xlYW47XG4gIGZldGNoSW1hZ2U6ICh1cmw6IHN0cmluZykgPT4gdm9pZDtcbiAgZmV0Y2hJbWFnZUZpbGU6IChmaWxlOiBGaWxlKSA9PiB2b2lkO1xuICBmZXRjaEV4cGxhbmF0aW9uOiAoZGlzZWFzZTogc3RyaW5nKSA9PiBQcm9taXNlPHZvaWQ+O1xufVxuXG5jb25zdCBqc29uQXBpID0ge1xuICBtZXRob2Q6IFwiUE9TVFwiLFxuICB1cmw6IGBodHRwczovL2RldGVjdC5yb2JvZmxvdy5jb20vdG9vdGgtZGlzZWFzZS8xP2FwaV9rZXk9dEFJZFVSRGlwZ3FXSkhBcHNsWlcmZm9ybWF0PWpzb25gLFxuICBoZWFkZXJzOiB7XG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0sXG4gIGRhdGE6IFwiXCIsXG59O1xuXG5jb25zdCBpbWFnZUFwaSA9IHtcbiAgbWV0aG9kOiBcIlBPU1RcIixcbiAgdXJsOiBgaHR0cHM6Ly9kZXRlY3Qucm9ib2Zsb3cuY29tL3Rvb3RoLWRpc2Vhc2UvMT9hcGlfa2V5PXRBSWRVUkRpcGdxV0pIQXBzbFpXJmZvcm1hdD1pbWFnZSZzdHJva2U9MyZsYWJlbHM9b25gLFxuICBoZWFkZXJzOiB7XG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0sXG4gIHJlc3BvbnNlVHlwZTogXCJhcnJheWJ1ZmZlclwiIGFzIGNvbnN0LFxuICBkYXRhOiBcIlwiLFxufTtcblxuZXhwb3J0IGNvbnN0IHVzZUltYWdlID0gY3JlYXRlPEltYWdlPigoc2V0KSA9PiAoe1xuICBpbWFnZTogbnVsbCxcbiAgY2hhcnREYXRhOiB7XG4gICAgY2xhc3NlczogW10sXG4gICAgY29uZmlkZW5jZXM6IFtdLFxuICAgIGNvbG9yczogW10sIC8vIEFkZCBjb2xvcnMgdG8gdGhlIGNoYXJ0IGRhdGFcbiAgfSxcbiAgZXhwbGFuYXRpb25zOiB7fSxcbiAgbG9hZGluZzogZmFsc2UsXG4gIG5vdEltYWdlVXJsOiBmYWxzZSxcbiAgZmV0Y2hJbWFnZTogYXN5bmMgKHVybDogc3RyaW5nKSA9PiB7XG4gICAgc2V0KHsgbG9hZGluZzogdHJ1ZSB9KTtcbiAgICBjb25zdCBqc29uQXBpVXJsID0ganNvbkFwaS51cmwgKyBgJmltYWdlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9YDtcbiAgICBjb25zdCBpbWFnZUFwaVVybCA9IGltYWdlQXBpLnVybCArIGAmaW1hZ2U9JHtlbmNvZGVVUklDb21wb25lbnQodXJsKX1gO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBqc29uUmVzcG9uc2UgPSBhd2FpdCBheGlvcyh7IC4uLmpzb25BcGksIHVybDoganNvbkFwaVVybCB9KTtcbiAgICAgIGNvbnN0IGpzb25SZXNwb25zZURhdGEgPSBqc29uUmVzcG9uc2UuZGF0YTtcblxuICAgICAgLy8gaGFuZGxlIHRoZSBpbWFnZSByZXNwb25zZVxuICAgICAgY29uc3QgaW1hZ2VSZXNwb25zZSA9IGF3YWl0IGF4aW9zKHsgLi4uaW1hZ2VBcGksIHVybDogaW1hZ2VBcGlVcmwgfSk7XG4gICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2ltYWdlUmVzcG9uc2UuZGF0YV0sIHsgdHlwZTogXCJpbWFnZS9qcGVnXCIgfSk7XG4gICAgICBjb25zdCBpbWFnZVBhdGggPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG4gICAgICBjb25zdCBjbGFzc2VzID0ganNvblJlc3BvbnNlRGF0YS5wcmVkaWN0aW9ucy5tYXAoXG4gICAgICAgIChwcmVkOiB7IGNsYXNzOiBzdHJpbmcgfSkgPT4gcHJlZC5jbGFzc1xuICAgICAgKTtcbiAgICAgIGNvbnN0IGNvbmZpZGVuY2VzID0ganNvblJlc3BvbnNlRGF0YS5wcmVkaWN0aW9ucy5tYXAoXG4gICAgICAgIChwcmVkOiB7IGNvbmZpZGVuY2U6IG51bWJlciB9KSA9PiBwcmVkLmNvbmZpZGVuY2VcbiAgICAgICk7XG4gICAgICBjb25zdCBjb2xvcnNBc3NpZ25lZCA9IGpzb25SZXNwb25zZURhdGEucHJlZGljdGlvbnMubWFwKFxuICAgICAgICAoXzogYW55LCBpbmRleDogbnVtYmVyKSA9PiBjb2xvcnNbaW5kZXggJSBjb2xvcnMubGVuZ3RoXSAvLyBBc3NpZ24gYSBjb2xvciBmcm9tIHRoZSBwcmVkZWZpbmVkIHNldFxuICAgICAgKTtcbiAgICAgIHNldCh7XG4gICAgICAgIGltYWdlOiBpbWFnZVBhdGgsXG4gICAgICAgIGNoYXJ0RGF0YToge1xuICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgY29uZmlkZW5jZXMsXG4gICAgICAgICAgY29sb3JzOiBjb2xvcnNBc3NpZ25lZCwgLy8gSW5jbHVkZSBjb2xvcnMgaW4gdGhlIGNoYXJ0IGRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgIG5vdEltYWdlVXJsOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBzZXQoeyBsb2FkaW5nOiBmYWxzZSwgbm90SW1hZ2VVcmw6IHRydWUgfSk7XG4gICAgfVxuICB9LFxuICBmZXRjaEltYWdlRmlsZTogYXN5bmMgKGZpbGU6IEZpbGUpID0+IHtcbiAgICBzZXQoeyBsb2FkaW5nOiB0cnVlIH0pO1xuICAgIGNvbnN0IGJhc2U2NEltYWdlID0gYXdhaXQgZ2V0QmFzZTY0RnJvbUZpbGUoZmlsZSk7XG4gICAgY29uc3QganNvbkFwaURhdGEgPSB7IC4uLmpzb25BcGksIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJhc2U2NEltYWdlKSB9O1xuICAgIGNvbnN0IGltYWdlQXBpRGF0YSA9IHsgLi4uaW1hZ2VBcGksIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJhc2U2NEltYWdlKSB9O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBqc29uUmVzcG9uc2UgPSBhd2FpdCBheGlvcyhqc29uQXBpRGF0YSk7XG4gICAgICBjb25zdCBqc29uUmVzcG9uc2VEYXRhID0ganNvblJlc3BvbnNlLmRhdGE7XG4gICAgICBjb25zdCBpbWFnZVJlc3BvbnNlID0gYXdhaXQgYXhpb3MoaW1hZ2VBcGlEYXRhKTtcbiAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbaW1hZ2VSZXNwb25zZS5kYXRhXSwgeyB0eXBlOiBcImltYWdlL2pwZWdcIiB9KTtcbiAgICAgIGNvbnN0IGltYWdlUGF0aCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBqc29uUmVzcG9uc2VEYXRhLnByZWRpY3Rpb25zLm1hcChcbiAgICAgICAgKHByZWQ6IHsgY2xhc3M6IHN0cmluZyB9KSA9PiBwcmVkLmNsYXNzXG4gICAgICApO1xuICAgICAgY29uc3QgY29uZmlkZW5jZXMgPSBqc29uUmVzcG9uc2VEYXRhLnByZWRpY3Rpb25zLm1hcChcbiAgICAgICAgKHByZWQ6IHsgY29uZmlkZW5jZTogbnVtYmVyIH0pID0+IHByZWQuY29uZmlkZW5jZVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGNvbG9yc0Fzc2lnbmVkID0ganNvblJlc3BvbnNlRGF0YS5wcmVkaWN0aW9ucy5tYXAoXG4gICAgICAgIChfOiBhbnksIGluZGV4OiBudW1iZXIpID0+IGNvbG9yc1tpbmRleCAlIGNvbG9ycy5sZW5ndGhdIC8vIEFzc2lnbiBhIGNvbG9yIGZyb20gdGhlIHByZWRlZmluZWQgc2V0XG4gICAgICApO1xuICAgICAgc2V0KHtcbiAgICAgICAgaW1hZ2U6IGltYWdlUGF0aCxcbiAgICAgICAgY2hhcnREYXRhOiB7XG4gICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICBjb25maWRlbmNlcyxcbiAgICAgICAgICBjb2xvcnM6IGNvbG9yc0Fzc2lnbmVkLCAvLyBJbmNsdWRlIGNvbG9ycyBpbiB0aGUgY2hhcnQgZGF0YVxuICAgICAgICB9LFxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgbm90SW1hZ2VVcmw6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHNldCh7IGxvYWRpbmc6IGZhbHNlLCBub3RJbWFnZVVybDogZmFsc2UgfSk7XG4gICAgfVxuICB9LFxuICBmZXRjaEV4cGxhbmF0aW9uOiBhc3luYyAoZGlzZWFzZTogc3RyaW5nKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdChcIi9hcGkvZXhwbGFpblwiLCB7IGRpc2Vhc2UgfSk7XG4gICAgICBjb25zdCBleHBsYW5hdGlvbiA9IHJlc3BvbnNlLmRhdGEuY29udGVudDtcbiAgICAgIHNldCgoc3RhdGUpID0+ICh7XG4gICAgICAgIGV4cGxhbmF0aW9uczogeyAuLi5zdGF0ZS5leHBsYW5hdGlvbnMsIFtkaXNlYXNlXTogZXhwbGFuYXRpb24gfSxcbiAgICAgIH0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGV4cGxhbmF0aW9uOlwiLCBlcnJvcik7XG4gICAgfVxuICB9LFxufSkpO1xuIl0sIm5hbWVzIjpbImNyZWF0ZSIsImF4aW9zIiwiZ2V0QmFzZTY0RnJvbUZpbGUiLCJjb2xvcnMiLCJqc29uQXBpIiwibWV0aG9kIiwidXJsIiwiaGVhZGVycyIsImRhdGEiLCJpbWFnZUFwaSIsInJlc3BvbnNlVHlwZSIsInVzZUltYWdlIiwic2V0IiwiaW1hZ2UiLCJjaGFydERhdGEiLCJjbGFzc2VzIiwiY29uZmlkZW5jZXMiLCJleHBsYW5hdGlvbnMiLCJsb2FkaW5nIiwibm90SW1hZ2VVcmwiLCJmZXRjaEltYWdlIiwianNvbkFwaVVybCIsImVuY29kZVVSSUNvbXBvbmVudCIsImltYWdlQXBpVXJsIiwianNvblJlc3BvbnNlIiwianNvblJlc3BvbnNlRGF0YSIsImltYWdlUmVzcG9uc2UiLCJibG9iIiwiQmxvYiIsInR5cGUiLCJpbWFnZVBhdGgiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJwcmVkaWN0aW9ucyIsIm1hcCIsInByZWQiLCJjbGFzcyIsImNvbmZpZGVuY2UiLCJjb2xvcnNBc3NpZ25lZCIsIl8iLCJpbmRleCIsImxlbmd0aCIsImVycm9yIiwiZmV0Y2hJbWFnZUZpbGUiLCJmaWxlIiwiYmFzZTY0SW1hZ2UiLCJqc29uQXBpRGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJpbWFnZUFwaURhdGEiLCJmZXRjaEV4cGxhbmF0aW9uIiwiZGlzZWFzZSIsInJlc3BvbnNlIiwicG9zdCIsImV4cGxhbmF0aW9uIiwiY29udGVudCIsInN0YXRlIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./store/image.tsx\n"));

/***/ })

});