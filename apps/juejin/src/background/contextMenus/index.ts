import { CONTEXT_MENUS_TYPE } from "./consts";

/**
 * 注册菜单
 */
export const contextMenusRegister = () => {
  for (let i = 0; i < CONTEXT_MENUS_TYPE.length; i++) {
    let context = CONTEXT_MENUS_TYPE[i];
    let title = "Test '" + context + "' menu item";
    chrome.contextMenus.create({
      title: title,
      contexts: [context],
      id: context,
    });
  }

  // Create a parent item and two children.
  let parent = chrome.contextMenus.create({
    title: "Test parent item",
    id: "parent",
  });
  chrome.contextMenus.create({
    title: "Child 1",
    parentId: parent,
    id: "child1",
  });
  chrome.contextMenus.create({
    title: "Child 2",
    parentId: parent,
    id: "child2",
  });

  // Create a radio item.
  chrome.contextMenus.create({
    title: "radio",
    type: "radio",
    id: "radio",
  });

  // Create a checkbox item.
  chrome.contextMenus.create({
    title: "checkbox",
    type: "checkbox",
    id: "checkbox",
  });

  // Intentionally create an invalid item, to show off error checking in the
  // create callback.
  chrome.contextMenus.create({ title: "Oops", parentId: 999, id: "errorItem" }, function () {
    // @ts-expect-error
    if (chrome.runtime?.lastError) {
      // @ts-expect-error
      console.log("Got expected error: " + chrome.runtime?.lastError?.message);
    }
  });
};
