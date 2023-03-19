import { defineStore } from "pinia";

export const useBoardSize = defineStore("boardSize", {
  state: () => {
    return { height: 0, rowsAndCols: 8 };
  },
  actions: {
    updateHeight(size: number): void {
      this.height = size;
    },
    updateRowsAndCols(n: number): void {
      this.rowsAndCols = n;
    }, // eslint-disable-next-line
    resize(_event: Event) {
      const board = document.querySelector("#mainboard")! as HTMLElement;
      if (board != null) {
        this.updateHeight(board.offsetWidth!);
      }
    },
    genVars(): string {
      return `--cg-width: ${this.height - 65}px; --cg-height: ${
        this.height - 65
      }px;`;
    },
    cgContainerStyle(): string {
      const height = this.height;
      return `width: ${height}px; height: ${height}px;`;
    },
  },
});
