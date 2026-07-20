#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination.
"""
import csv
from typing import List, Dict, Any


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """
        Return a dictionary with deletion-resilient pagination information.

        Args:
            index (int): The current start index of the return page.
            page_size (int): The current page size.

        Returns:
            Dict: Dictionary containing pagination metadata and data.
        """
        indexed_data = self.indexed_dataset()

        # Eger index None-dirsa, 0-dan baslayir
        if index is None:
            index = 0

        # Dogrulama (Assert yoxlamalari)
        assert isinstance(index, int) and 0 <= index < len(indexed_data)
        assert isinstance(page_size, int) and page_size > 0

        data = []
        current_index = index

        # page_size qeder silinmemis elementi yigiriq
        while len(data) < page_size and current_index < len(indexed_data):
            item = indexed_data.get(current_index)
            if item is not None:
                data.append(item)
            current_index += 1

        # Novbeti sorğu indeksi
        next_index = current_index if current_index < len(indexed_data) else None

        return {
            "index": index,
            "data": data,
            "page_size": len(data),
            "next_index": next_index
        }
